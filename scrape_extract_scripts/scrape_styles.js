const axios = require("axios")
const cheerio = require("cheerio")
const styles = require("../scrape_extract_data/styles.json")
const fs = require("fs")

const scrapeStyleInfo = async style =>{
	let styleObject = {
		name: style.style,
		baLink: style.style_link
	}
	let stylePage = await axios.get(style.style_link)
	let styleHtml = cheerio.load(stylePage.data)
	let textBlock = styleHtml('#ba-content div:first-of-type').text()
	let splitTextBlock = textBlock.split("\n")
	styleObject.description = splitTextBlock[1]
	let moreInfo = splitTextBlock[2].split(" | ")
	styleObject.abvRange = moreInfo[0].replace("ABV: ","")
	styleObject.ibuRange = moreInfo[1].replace("IBU: ","")
	styleObject.glassware = moreInfo[2].replace("Glassware: ","")
	return styleObject;
}

var stylesFinal = []

// Grabs style info
// 4 at a time
const fetchInLoop = async (data, set) =>{
	if (set == undefined){
		set = {
			min: 0,
			max: 4
		}
	}
	var promises = data.slice(set.min, set.max).map(async(style) =>{
		return await scrapeStyleInfo(style)
	})

	Promise.all(promises).then(function(results) {
		console.log(`Completed set of ${set.min} and ${set.max}`)
		results.map(res => {
			stylesFinal.push(res)
		})
		console.log(`stylesFinal is currently ${stylesFinal.length} long`)
		if(data.length <= set.max){
			console.log(`Writing to file`)
			fs.writeFileSync(`${__dirname}/../scrape_extract_data/styles_final.json`, JSON.stringify(stylesFinal));
		}else{
		    let newSet = {
				min: set.min + 4,
				max: set.max + 4
			}
			setTimeout(()=>{fetchInLoop(data, newSet)}, 2000)
		}
	}).catch(err =>{
		console.log(err)
		fetchInLoop(data, set)
	})
}

fetchInLoop(styles).then(res =>{
	
}).catch(err => {
	console.log(err)
})