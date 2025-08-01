const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

usersRouter.get('/users', usersController.getAllUsers);
usersRouter.delete('/users/:id', usersController.deleteUser);
usersRouter.get('/users/:id', usersController.getUsersById);
usersRouter.post('/users', usersController.createUser);
usersRouter.put('/users/:id', usersController.updateUser);

module.exports = usersRouter;