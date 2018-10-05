const beers = require("../scrape_extract_data/flat_beer_list.json")
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.
    
      // Example:
      return queryInterface.bulkInsert('Beers', beers.map(beer =>{
        return {
          name: beer.name,
          ba_link: beer.link,
          style_link: beer.style_link,
          brewery_link: beer.brewery_link,
          abv: beer.abv,
          rating_counts: beer.rating_counts,
          total_score: beer.total_score,
          created_at: new Date(),
          updated_at: new Date()
        }
      }), {});
  },

  down: (queryInterface, Sequelize) => {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkDelete('Beers', null, {});
  }
};
