const styles = require("../scrape_extract_data/styles_final.json")
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.
    
      // Example:
      return queryInterface.bulkInsert('Styles', styles.map(style =>{
        return {
          name: style.name,  
          ba_link: style.baLink,
          description: style.description,
          abv_range: style.abvRange,
          ibu_range: style.ibuRange,
          glassware: style.glassware,
          created_at: new Date(),
          updated_at: new Date()
        }
      }), {});
  },

  down: (queryInterface, Sequelize) => {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.
    
      // Example:
      return queryInterface.bulkDelete('Styles', null, {});
  }
};
