const breweries = require("../scrape_extract_data/breweries.json")
const fs = require("fs")
const point = coords =>{
  return {
    type: 'Point',
    coordinates: [parseFloat(coords.lat),parseFloat(coords.lng)],
    crs: { type: 'name', properties: { name: 'EPSG:4326'}}
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('Breweries', breweries.map( brewery =>{
        let breweryId = parseInt(brewery.link.split("/")[5])
        let cleanFile = `${__dirname}/../scrape_extract_data/brewery_geo_latlong/${breweryId}.json`
        
        try {
          var file = fs.readFileSync(cleanFile, 'utf8')
          let geometry = JSON.parse(file).results[0].geometry
          brewery.position = file ?  Sequelize.fn('ST_GeomFromText', `POINT(${geometry.lat} ${geometry.lng})`, '3785') : undefined
        }
        catch(err) {
          if(err.syscall!="open"){
            console.log(err)
          }
          // console.log(`File does not exist for ${brewery.name}`)
        }

        return {
          name: brewery.name,  
          phone_number: brewery.phone_number,
          address: (brewery.address == undefined ? "" : brewery.address), 
          city: brewery.city, 
          state: brewery.state,
          country: brewery.country,
          zipcode: brewery.zipcode,
          position: brewery.position,
          website: "",
          ba_link: brewery.link,
          features: brewery.features,
          created_at: new Date(),
          updated_at: new Date()
        }
      }), {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkDelete('Breweries', null, {});
    
  }
};
