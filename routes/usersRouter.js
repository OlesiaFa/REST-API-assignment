const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

usersRouter.get('/', usersController.getAllUsers);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.get('/:id', usersController.getUsersById);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/:id', usersController.updateUser);

module.exports = usersRouter;