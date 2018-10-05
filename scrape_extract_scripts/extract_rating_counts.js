const fs = require("fs")

// for getting sums
const reducer = (accumulator, currentValue) => accumulator + currentValue;
// This is the directory of json files
const dir = `${__dirname}/../scrape_extract_data/beer_by_brewery`
// Get a list of files from the folder
const files = fs.readdirSync(dir).map(x => `${dir}/${x}`);

// Get the number of pages
// as the reviews are paginated
const ratingsPageCounts = num =>{
    let residuals = num%25
	return num <= 25 ? 1 : parseInt((num/25) + (residuals > 0 ? 1 : 0))
}

// Creates an array of URL's
// that are paginated
const mapPages = (beer) =>{
	let currentPage = beer.link
	let reviewCounts = parseInt(beer.rating_counts)
	let numPages = ratingsPageCounts(reviewCounts)
	var pages = []
	for(let i = 0; i < numPages; i++){
		if(i == 0){
			pages.push(currentPage)
		}else{
			pages.push(`${currentPage}?start=${25 * i}`)
		}
	}
	return pages;
}

var beerCount = beerRatings = beerPages = 0
var pagesByBrewery = {}
const MAX_RATINGS = 25
// Loop over each file
// open the file
// get the total number of beers
// loop through the beers
// get the count of the ratings
// get the number of pages I need
	// to scrape
// get the total number of reviews

files.map(file =>{
	let contents = JSON.parse(fs.readFileSync(file));
	if(contents.length > 0){
		let breweryName = contents[0].brewery_name;
		if(!(breweryName in pagesByBrewery)){
			pagesByBrewery[breweryName] = []
		}
		beerCount += contents.length
		contents.map(beer =>{

			// if(parseInt(beer.rating_counts) >= MAX_RATINGS){
			// 	beer.rating_counts = MAX_RATINGS
			// }

			beerRatings += parseInt(beer.rating_counts)
			beerPages += ratingsPageCounts(parseInt(beer.rating_counts)) 
			pagesByBrewery[breweryName].push(mapPages(beer))
		})
	}
})

// 197,500 beers
console.log(`Total Beer Count is: ${beerCount}`)
// 3,762,008 ratings
console.log(`Total Beer Ratings is: ${beerRatings}`)
// 311,334 pages of ratings
console.log(`Total Pages to scrape is: ${beerPages}`)

setTimeout(function(){
	// Links I need to scrape
	console.log(pagesByBrewery)
}, 6000)
