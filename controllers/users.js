const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().collection('users').find();
    result.toArray()
        .then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error retrieving users', error: err });
        });
}

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('users').find({ _id: userId });
    result.toArray().then((user) => {
            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error retrieving user', error: err });
        });
}

module.exports = {
    getAll,
    getSingle
};
