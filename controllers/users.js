const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('users').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users', error: err });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('users').find({ _id: userId }).toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err });
    }
};

module.exports = {
    getAll,
    getSingle
};
