const fs = require("fs")
const {uniqBy} = require("lodash")

// This is the directory of json files
const dir = `${__dirname}/../scrape_extract_data/beers_by_brewery`
// Get a list of files from the folder
const files = fs.readdirSync(dir).map(x => `${dir}/${x}`);

// Loop over each file
// open the file
// loop through the beers
// get the styles
let totalPages = files.map(file => {
	let contents = JSON.parse(fs.readFileSync(file));
	return contents.map(beer =>{
		return {style: beer.style_name, style_link: beer.style_link}
	})
})

const flatPages = [].concat.apply([], totalPages)
const styles = uniqBy(flatPages, "style")
console.log(JSON.stringify(styles))