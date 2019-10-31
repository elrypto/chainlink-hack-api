const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const port  = 8000;

require('./app/routes')(app, {});

app.listen(process.env.PORT || port, () => {
  console.log("Express server listening");
})