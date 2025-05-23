const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

const connectDb = (callback) => {

    const mongoUrl = process.env.MONGODB_URL;

    if (!mongoUrl) {
        return callback(new Error('MONGODB_URL environment variable is not set.'));
    }

    MongoClient.connect(mongoUrl)
        .then((client) => {
            db = client.db();
            console.log('Database initialized!');
            return callback(null, db);
        })
        .catch((err) => {
            console.error('Database initialization error:', err);
            return callback(err);
        });
};


const getDb = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

module.exports = { connectDb, getDb };
