const http = require('http');
const express = require('express');
const apicache = require('apicache');
const Sequelize = require('sequelize')
const env = process.env;

const sequelize = new Sequelize(
    env["POSTGRES_DB_NAME"],
    env["POSTGRES_USER"],
    env["POSTGRES_PASSWORD"], {
    dialect: "postgres",
    port: 5432
});

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) { 
        console.log('Unable to connect to the database:', err);
    });

apicache.options({debug:true});
const cache = apicache.middleware; 
const app = express();
// app.use(cache('168 hours'));
const server = http.createServer(app);
  

const queryResults = async (query)=>{
  try{
    console.log(query)
    return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
  }catch(err){
    console.log(err)
  }
}

app.get('/', async (req, res, next) => {
  if(req.query){
    let results = await queryResults(req.query)
    console.log(results)
  }
  res.send('hello world CHANGED')
});
 
app.use(function notFoundMiddleware(req, res, next) {
  next(Object.assign(new Error('Not Found'), { status: 404 }));
});
 
app.use((err, req, res, _next) => {
  const { name, message, status = 500 } = err;
  if (status >= 500) {
    console.error(err);
  }
  res.status(status);
  res.json({ name, message, status });
});
 
server.listen(process.env.PORT || 3000, () => {
  console.info('Listening on http://localhost:3000');
});