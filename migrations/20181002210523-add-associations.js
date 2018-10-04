'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.addColumn(
      // 'Beer', // name of Source model
      // 'BreweryId', // name of the key we're adding 
      // {
      //   type: Sequelize.UUID,
      //   references: {
      //     model: 'Brewery', // name of Target model
      //     key: 'id', // key in Target model that we're referencing
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'SET NULL',
      // }
    // )
    // .then(()=>{
    //  return queryInterface.addColumn(
    //     'Beers', // name of Target model
    //     'BreweryId', // name of the key we're adding
    //     {
    //       type: Sequelize.UUID,
    //       references: {
    //         model: 'Brewery', // name of Source model
    //         key: 'id',
    //       },
    //       onUpdate: 'CASCADE',
    //       onDelete: 'SET NULL',
    //     }
    //   ) 
    // });
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.removeColumn(
      // 'Beer' // name of Source model
      // 'BreweryId', // key we want to remove
    // );
  }
};
