const Sequelize = require('sequelize')
const env = process.env;
const sequelize = new Sequelize(
    env("POSTGRES_DB_NAME"),
    env("POSTGRES_USER"),
    env("POSTGRES_PASSWORD"), {
    dialect: "postgres"
    port: 5432
});

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) { 
        console.log('Unable to connect to the database:', err);
    });