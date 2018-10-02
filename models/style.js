'use strict';
module.exports = (sequelize, DataTypes) => {
  const Style = sequelize.define('Style', {
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