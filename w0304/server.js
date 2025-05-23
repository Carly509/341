const express = require('express');
require('dotenv').config();
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  next()
});

app.use('/', require ('./routes'));

mongodb.connectDb((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
  app.listen(port, () => {console.log(`Database is listening and node is running on port ${port}`)});
  }
});
