const fs = require("fs")

// for getting the sums
const reducer = (accumulator, currentValue) => accumulator + currentValue;
// This is the directory of json files
const dir = `./breweries`
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
const mapPages = (brewery) =>{
	let currentPage = brewery.link
	let reviewCounts = parseInt(brewery.rating_counts)
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

// Loop over each file
// open the file
// loop through the beers
// get the count of the ratings
// add them up to get the total
// number of ratings
let totalPages = files.map(file => {
	let contents = JSON.parse(fs.readFileSync(file));
	if(contents.length > 0){
		return contents.map((brew, i) => {
			let hash = {};
			hash[brew.name + i] = mapPages(brew)
			return hash
		})
	}else{
		return 0
	}
}).filter(x => x != 0)

console.log(JSON.stringify(totalPages)) 

// 197,500 beers
// 311,334 pages of ratings
// 3,762,008 ratings

// // Grabbing the counts from the DOM
// // Need to refactor to use the
// // Cheerio API
// const getReviewCounts = ()=>{
// 	return parseInt($("div b")[17].innerText.replace(" Ratings: ","").replace(",",""))
// }