const fs = require("fs")

// for getting sums
const reducer = (accumulator, currentValue) => accumulator + currentValue;
// This is the directory of json files
const dir = `${__dirname}/../scrape_extract_data/beer_by_brewery`
// Get a list of files from the folder
const files = fs.readdirSync(dir).map(x => `${dir}/${x}`);

var finalListOfBeers = [];

files.map(file =>{
	let contents = JSON.parse(fs.readFileSync(file));
	if(contents.length > 0){
		return contents.map(beer =>{
			beer.abv = parseFloat(beer.abv)
			beer.total_score = parseFloat(beer.total_score)
			beer.rating_counts = parseInt(beer.rating_counts)
			finalListOfBeers.push(beer)
		})
	}
})

console.log(JSON.stringify(finalListOfBeers, null, 2))