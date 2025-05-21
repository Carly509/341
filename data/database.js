require('dotenv').config(); // Load environment variables

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }

    const mongoUrl = process.env.MONGODB_URL;
    console.log('MongoDB URL:', mongoUrl);

    if (!mongoUrl) {
        return callback(new Error('MONGODB_URL environment variable is not set.'));
    }

    MongoClient.connect(mongoUrl)
        .then((client) => {
            database = client.db();
            console.log('Database initialized!');
            return callback(null, database);
        })
        .catch((err) => {
            console.error('Database initialization error:', err);
            return callback(err);
        });
};

const getDb = () => {
    if (!database) {
        throw new Error('Database is not initialized. Call initDb first.');
    }
    return database;
};

module.exports = {
    initDb,
    getDb
};
