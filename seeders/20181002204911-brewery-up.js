const breweries = require("../scrape_extract_data/breweries.json")
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('Breweries', breweries.map(brewery =>{
        return {
          name: brewery.name,  
          phoneNumber: brewery.phone_number,
          address: (brewery.address == undefined ? "" : brewery.address), 
          city: brewery.city, 
          state: brewery.state,
          country: brewery.country,
          zipcode: brewery.zipcode,
          website: "",
          baLink: brewery.link,
          features: brewery.features,
          createdAt: new Date(),
          updatedAt: new Date()
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
