const env = process.env


let finalConfig = {
  production: {
    // username: env.DB_USERNAME,
    // password: env.DB_PASSWORD,
    // database: env.DB_NAME,
    // host: env.DB_HOSTNAME,
    dialect: "postgres",
    use_env_variable: 'DATABASE_URL',
    ssl: true,
    dialectOptions: {
        ssl: true
    },
    define: {
      underscored: false,
      freezeTableName: false,
      syncOnAssociation: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  }
};
console.log("Setting configs")
console.log(`database URL is ${env.DATABASE_URL}`)

if(env.DATABASE_URL == undefined){
    finalConfig.development = {
      username: "postgres",
      password: env.PG_PASS,
      database: "craft_beer_development",
      host: "127.0.0.1",
      dialect: "postgres",
      define: {
        underscored: false,
        freezeTableName: false,
        syncOnAssociation: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    },
    finalConfig.test = {
      username: "root",
      password: null,
      database: "craft_beer_test",
      host: "127.0.0.1",
      dialect: "postgres"
    }
}

module.exports = finalConfig;