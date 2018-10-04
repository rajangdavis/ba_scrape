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
          baLink: style.baLink,
          description: style.description,
          abvRange: style.abvRange,
          ibuRange: style.ibuRange,
          glassware: style.glassware,
          createdAt: new Date(),
          updatedAt: new Date()
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
