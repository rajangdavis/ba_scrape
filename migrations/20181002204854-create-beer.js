'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Beers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      brewery_link: {
        type: Sequelize.STRING
      },
      style_link: {
        type: Sequelize.STRING
      },
      ba_link: {
        type: Sequelize.STRING
      },
      abv: {
        type: Sequelize.FLOAT
      },
      rating_counts: {
        type: Sequelize.INTEGER
      },
      total_score: {
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Beers');
  }
};