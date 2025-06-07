const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');


router.post('/', usersController.createUser);
router.post('/login', usersController.loginUser);
router.get('/', usersController.authenticateToken, usersController.getAllUsers);
router.get('/:id', usersController.authenticateToken, usersController.getUser);
router.put('/:id', usersController.authenticateToken, usersController.updateUser);
router.delete('/:id', usersController.authenticateToken, usersController.deleteUser);
router.post('/logout', usersController.authenticateToken, usersController.logoutUser);

module.exports = router;
