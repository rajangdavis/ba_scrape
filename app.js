const http = require('http');
const express = require('express');
const apicache = require('apicache');
const {sequelize} = require("./models/index.js")

const env = process.env;


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
  if(req.query!=undefined){
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