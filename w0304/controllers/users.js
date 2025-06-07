const mongodb = require('../data/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const validateUser = (user) => {
  const { username, email, name, password } = user;
  if (!username || typeof username !== 'string') {
    return 'Invalid username';
  }
  if (!email) {
    return 'Invalid email';
  }
  if (!name || typeof name !== 'string') {
    return 'Invalid name';
  }
  if (!password || typeof password !== 'string') {
    return 'Invalid password';
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

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword
    };

    const result = await mongodb.getDb().collection('users').insertOne(user);

    if (result.acknowledged) {
      res.status(201).json({ message: 'User created successfully', _id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Error creating user' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  //#swagger.tags = ['Users']
  try {
    const { email, password } = req.body;
    const user = await mongodb.getDb().collection('users').findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const getAllUsers = async (req, res) => {
  //#swagger.tags = ['Users']
  try {
    const result = await mongodb.getDb().collection('users').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
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
      name: req.body.name,
      password: req.body.password ? await bcrypt.hash(req.body.password, 10) : undefined
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

const logoutUser = (req, res) => {
  //#swagger.tags = ['Users']
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful.' });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  authenticateToken,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
