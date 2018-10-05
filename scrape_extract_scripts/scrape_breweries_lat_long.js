const axios = require("axios")
const breweries = require("../scrape_extract_data/breweries.json")
const fs = require("fs")
const util = require('util')
const fs_writeFile = util.promisify(fs.writeFile)
const fs_exist = util.promisify(fs.stat)

const writeToFile = async brewery=>{
	let breweryId = parseInt(brewery.link.split("/")[5])
	let cleanString = `${brewery.address}, ${brewery.city}, ${brewery.state}, ${brewery.zipcode}`;
	let apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURI(cleanString)}&key=${process.env.OPEN_CAGE}`.replace("#","%23")
	let cleanFile = `${__dirname}/../scrape_extract_data/brewery_geo_latlong/${breweryId}.json`
	try{
		let fileExists = await fs_exist(cleanFile)
		console.log("File exists")
	}catch(err){
		console.log(`File does not exist: creating for ${brewery.name}`)
		console.log(apiUrl)
		let latLongResponse = await axios.get(apiUrl)
		return await fs_writeFile(cleanFile,JSON.stringify(latLongResponse.data))
	}
}

breweries.filter(brewery => brewery.state == "Minnesota").map(async brewery => {
	try{
		if(brewery.address){
			return writeToFile(brewery)
		}
	}catch(err){
		console.log(err)
	}
})