const env = process.env

module.exports = {
  development: {
    username: "postgres",
    password: env.PG_PASS,
    database: "craft_beer_development",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "craft_beer_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOSTNAME,
    dialect: "postgres",
    use_env_variable: 'DATABASE_URL',
    ssl: true,
    dialectOptions: {
        ssl: true
    }
  }
};