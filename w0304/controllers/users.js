const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const createUser = async (req, res) => {
      //#swagger.tags = ['Users']
    try {
        const user = {
            username: req.body.name,
            email: req.body.email,
            name: req.body.name
        };

        const result = await mongodb.getDb().collection('users').insertOne(user);

        if (result.acknowledged) {
            res.status(201).json({ message: 'User created successfully', _userId: result.insertedId });
        } else {
            res.status(500).json({ message: 'Error creating user' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err });
    }
};

const getUser = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('users').find({ _userId: userId }).toArray();

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
    createUser,
    getUser
};
