'use strict';
module.exports = (sequelize, DataTypes) => {
  const Beer = sequelize.define('Beer', {
    name: DataTypes.STRING,
    abv: DataTypes.FLOAT,
    ratings_count: DataTypes.INTEGER,
    total_score: DataTypes.FLOAT
  }, {});
  Beer.associate = function(models) {
    Beer.belongsTo(models.Brewery)
    Beer.hasOne(models.Style, {as: "Style"})
  };
  return Beer;
};