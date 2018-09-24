const axios = require("axios")
const cheerio = require("cheerio")

const BASE_URL = "https://www.beeradvocate.com"

const fetchPage = async (url)=>{
	return await axios.get(url)
}

// Cleans up the brewery links for the state
// this is so that we can avoid trying to click
// on a link of breweries for a given state page
const getBreweryLinkForState = stateLink => {
	let str = stateLink
	str = str.replace("directory","list")
	str = str.replace("0/","?c_id=")
	str = str.replace("?c_id=US/", "?c_id=US&s_id=")
	str = `${str.slice(0, -1)}&brewery=Y`
	return str
}

// This is for grabbing the number of results
// for the state brewery search
// This is so that we can figure out 
// mathematically how many/which pages to fetch
// for a state without having to click next
const dissectPagination = (breweryLink, minMax) =>{
	let pageCount = ((minMax[1]-(minMax[1]%minMax[0]))/minMax[0]) + (minMax[1]%minMax[0] > 0 ? 1 : 0)
	return [...Array(pageCount).keys()].map(x => `${breweryLink}&start=${x * minMax[0]}`)
}

// Probably don't need
// Data structures for each page

// const firstPageData = {
// 	"url": `${BASE_URL}/place/directory/0/US/`,
// 	"selector" : "#ba-content table table:nth-of-type(1) tr td a"
// }

// const beerListData = stateLink =>{
// 	return {
// 		"url": `${BASE_URL}${stateLink.attribs.href}`,
// 		"selector" : "#ba-content table table:nth-of-type(1) tr td a"
// 	}
// }


// Abstract into an init function
fetchPage(`${BASE_URL}/place/directory/0/US/`).then((response)=>{
	let parsedHtml = cheerio.load(response.data)
	let stateLinks = parsedHtml("#ba-content table table:nth-of-type(1) tr td a")
	// Abstract into function for getting
	// Breweries
		// Scrape the page HTML for
			// Name
			// Address
			// Phone Number
			// Home page
			// Link
			// What kind of features the brewery has
		// Get list of beers
			// Get name
			// Link
			// Style
	// Then the beer pages
		// Figure out how many reviews to get
	let stateBreweryLinks = stateLinks.map(async (i, stateLink) => { 
		let breweryLink = getBreweryLinkForState(`${BASE_URL}${stateLink.attribs.href}`)
		let breweryResponse = await fetchPage(breweryLink)
		let breweryPageHtml = cheerio.load(breweryResponse.data)
		let resultsExtraction = "#ba-content table tr:nth-of-type(1) td span b"
		let resultsText = breweryPageHtml(resultsExtraction)[0].children[0].data
		if(resultsText.indexOf("Results: 1 to") > -1)
			var resultsFragments = resultsText.replace("Results: 1 to ","").replace("):","").split(" (out of ")
			let minMax = resultsFragments.map(x=>parseInt(x))
			let pages = dissectPagination(breweryLink, minMax)
			// Abstract into a page function
			pages.map( async(page) => {
				let stateBreweryListPage = await fetchPage(page)
				let stateBreweryPageHtml = cheerio.load(stateBreweryListPage.data)
				stateBreweryPageHtml("#ba-content table tr:nth-child(n+4)").map((j, trData)=> {
					if(j == 0)
						// Get as much brewery info as possible
						console.log(`${BASE_URL}${trData.children[0].children[0].attribs.href}`)
				})
			})
			// return pages
	})
}).catch((error)=>{
	console.log("There was an error:")
	console.log(error)
})