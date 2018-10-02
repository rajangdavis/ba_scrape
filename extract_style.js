const fs = require("fs")
const {uniqBy}= require("lodash")

// This is the directory of json files
const dir = `./breweries`
// Get a list of files from the folder
const files = fs.readdirSync(dir).map(x => `${dir}/${x}`);

// Loop over each file
// open the file
// loop through the beers
// get the count of the ratings
// add them up to get the total
// number of ratings

var beerCount = 0;

let totalPages = files.map(file => {
	let contents = JSON.parse(fs.readFileSync(file));
	beerCount += contents.length
	return contents.map(beer =>{
		return {style: beer.style_name, style_link: beer.style_link}
	})
})

const flatPages = [].concat.apply([], totalPages)
const styles = uniqBy(flatPages, "style")
console.log(JSON.stringify(styles))