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

module.exports = {
	getBreweryLinkForState: getBreweryLinkForState,
	dissectPagination: dissectPagination
}