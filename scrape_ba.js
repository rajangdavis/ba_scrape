const axios = require("axios")
const cheerio = require("cheerio")
const {getBreweryLinkForState, dissectPagination} = require("./clean_text.js")

const BASE_URL = "https://www.beeradvocate.com"

const fetchPageData = async (pages) =>{
	return pages.map(async(page) => {
		let stateBreweryListPage = await axios.get(page)
		let stateBreweryPageHtml = cheerio.load(stateBreweryListPage.data)
		return stateBreweryPageHtml("#ba-content table tr:nth-child(n+4) td a b").map((j, aData)=> {
			let brewery = {}
			// Get as much brewery info as possible
			// Scrape the page HTML for
			// Name
			brewery["name"] = aData.children[0].data.replace('"the garage project"',"")
			// Address
			// Phone Number
			let addressAndFeatures = aData.parent.parent.parent.next.children;
			let addresses = addressAndFeatures[0].children.map((x) =>{
				if(x.type == "text"){
					return x.data;
				}else if (x.name == "a"){
					return x.children[0].data
				}
			}).filter(x => x != undefined).filter(x => x != ", ")
			if(addresses[addresses.length - 1] != "United States"){
				let phoneNumber = addresses.pop()
				brewery["phone_number"] = phoneNumber
			}
			let country = addresses.pop()
			brewery["country"] = country
			let zipcode = addresses.pop().replace(", ","").replace(",","")
			let state;
			if(isNaN(parseInt(zipcode))){
				state = zipcode
			}else{
				state = addresses.pop()
				brewery["zipcode"] = zipcode
			}
			brewery["state"] = state
			let city = addresses.pop()
			brewery["city"] = city
			let address = addresses.join(", ")
			brewery["address"] = address
			// Link
			brewery["link"] = `${BASE_URL}${aData.parent.attribs.href}`
			// What kind of features the brewery has
			brewery["features"] = addressAndFeatures[1].children[0].data
			console.log(JSON.stringify(brewery));
		})
	})
}

const stateLinkParsing = async (stateLinks)=>{
	return stateLinks.map(async (i, stateLink) => { 
		let breweryLink = getBreweryLinkForState(`${BASE_URL}${stateLink.attribs.href}`)
		let breweryResponse = await axios.get(breweryLink)
		let breweryPageHtml = cheerio.load(breweryResponse.data)
		let resultsExtraction = "#ba-content table tr:nth-of-type(1) td span b"
		let resultsText = breweryPageHtml(resultsExtraction)[0].children[0].data
		if(resultsText.indexOf("Results: 1 to") > -1)
			var resultsFragments = resultsText.replace("Results: 1 to ","").replace("):","").split(" (out of ")
			let minMax = resultsFragments.map(x=>parseInt(x))
			let pages = dissectPagination(breweryLink, minMax)		
			return await fetchPageData(pages)
	})
}

// Starts the fetching
const init = async ()=>{
	let response = await axios.get(`${BASE_URL}/place/directory/0/US/`)
	let parsedHtml = cheerio.load(response.data)
	let stateLinks = parsedHtml("#ba-content table table:nth-of-type(1) tr td a")
	return await stateLinkParsing(stateLinks);
}

init().then((result)=>{
	// console.log(result)
}).catch((error)=>{
	console.log("There was an error:")
	console.log(error)
})




// Get list of beers
	// Get name
	// Link
	// Style
// Then the beer pages
	// Figure out how many reviews to get

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