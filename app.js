const http = require('http');
const express = require('express');
const {sequelize} = require("./models/index.js")
const env = process.env;

const app = express();
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
  res.setHeader('Content-Type', 'application/json');
  if(req.query != ""){
    let results = await queryResults(req.query)
    res.send(JSON.stringify(results))
  }else{
    res.send(JSON.stringify({error: "Must send a valid query"}))
  }
});
 
server.listen(process.env.PORT || 3000, () => {
  console.info('Listening on http://localhost:3000');
});