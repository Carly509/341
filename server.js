const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  next()
});

app.use('/', require ('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
  app.listen(port, () => {console.log(`Database is listening and node is running on port ${port}`)});
  }
});
