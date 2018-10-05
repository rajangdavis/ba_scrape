'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brewery = sequelize.define('Brewery', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    website: DataTypes.STRING,
    position: DataTypes.FLOAT,
    ba_link: DataTypes.STRING
  }, {});
  Brewery.associate = function(models) {
    Brewery.hasMany(models.Beer, {as: 'Beers'})
  };
  return Brewery;
};