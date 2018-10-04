'use strict';
module.exports = (sequelize, DataTypes) => {
  const Style = sequelize.define('Style', {
    name: DataTypes.STRING,
    baLink: DataTypes.STRING,
    abvRange: DataTypes.STRING,
    ibuRange: DataTypes.STRING,
    glassware: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Style.associate = function(models) {
    Style.hasMany(models.Beer, {as: "Beers"})
  };
  return Style;
};