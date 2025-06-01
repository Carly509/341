const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const validateUser = (user) => {
  const { username, email, name } = user;
  if (!username || typeof username !== 'string') {
    return 'Invalid username';
  }
  if (!email) {
    return 'Invalid email';
  }
  if (!name || typeof name !== 'string') {
    return 'Invalid name';
  }
  return null;
};

const createUser = async (req, res) => {
  //#swagger.tags = ['Users']
  try {
    const validationError = validateUser(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    const user = {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name
    };
    const result = await mongodb.getDb().collection('users').insertOne(user);

    if (result.acknowledged) {
      res.status(201).json({ message: 'User created successfully', _id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Error creating user' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

const getAll = async (req, res) => {
  //#swagger.tags = ['Users']
  try {
    const result = await mongodb.getDb().collection('users').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err });
  }
};

const getUser = async (req, res) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('users').findOne({ _id: userId });

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving user', error: err.message });
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const validationError = validateUser(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const updatedUser = {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name
    };

    const result = await mongodb.getDb().collection('users').updateOne(
      { _id: userId },
      { $set: updatedUser }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('users').deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

module.exports = {
  createUser,
  getAll,
  getUser,
  updateUser,
  deleteUser
};
