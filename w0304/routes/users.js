const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.post('/', usersController.createUser);
router.get('/', usersController.getAll);
router.get('/:id', usersController.getUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
