const axios = require("axios")
const cheerio = require("cheerio")
const data = require("../scrape_extract_data/breweries.json")
const fs = require('fs');
const util = require('util')
const fs_writeFile = util.promisify(fs.writeFile)

const BASE_URL = "https://www.beeradvocate.com"

// Gets all of the beer scores
// for a given brewery page
const fetchBreweryPage = async (brewery, breweryId) =>{
	let breweryHtml = await axios.get(brewery.link)
	let breweryPageHtml = cheerio.load(breweryHtml.data)
	let brewTable = breweryPageHtml("table.sortable tbody tr")
	let beerRatings = []
	brewTable.map((i, row) => {
		let beerObj = {}
		beerObj.brewery_name = brewery.name
		beerObj.brewery_link = brewery.link
		let brewRow = row.children
		let beerLink = brewRow[0].children[0].attribs.href
		beerObj.link = `${BASE_URL}${beerLink}`
		let beerName = brewRow[0].children[0].children[0].children[0].data
		beerObj.name = beerName
		let beerStyleLink = brewRow[1].children[0].attribs.href
		beerObj.style_link = `${BASE_URL}${beerStyleLink}`
		let beerStyleName = brewRow[1].children[0].children[0].data
		beerObj.style_name = beerStyleName
		let beerAbv = brewRow[2].children[0].children[0].data
		beerObj.abv = beerAbv
		let beerRatingCounts = brewRow[3].children[0].children[0].data
		beerObj.rating_counts = beerRatingCounts
		let beerTotalScore = brewRow[4].children[0].children[0].data
		beerObj.total_score = beerTotalScore
		beerRatings.push(beerObj)
	})

	let cleanFile = `${__dirname}/../scrape_extract_data/beer_by_brewery/${breweryId}.json`

	return await fs_writeFile(cleanFile,JSON.stringify(beerRatings))
}

// Grabs brewery pages
// 4 at a time
const fetchInLoop = async (data, set) =>{
	if (set == undefined){
		set = {
			min: 0,
			max: 4
		}
	}
	var promises = data.slice(set.min, set.max).map(async (brewery,i) =>{
		console.log(`Grabbing ${brewery.name} Info`)
		let idFirstPass = brewery.link.replace("https://www.beeradvocate.com/beer/profile/","")
		let idFinal = parseInt(idFirstPass.replace("/",""))
		return await fetchBreweryPage(brewery, idFinal)
	})

	Promise.all(promises).then(function(results) {
		console.log(`Completed set of ${set.min} and ${set.max}`)
	    let newSet = {
			min: set.min + 4,
			max: set.max + 4
		}
		setTimeout(()=>{fetchInLoop(data, newSet)}, 2000)
	}).catch(err =>{
		console.log(err)
		fetchInLoop(data, set)
	})
}

fetchInLoop(data).then(res =>{
	
}).catch(err => {
	console.log(err)
})