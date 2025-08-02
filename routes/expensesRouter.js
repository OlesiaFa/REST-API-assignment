const express = require('express');
const expensesRouter = express.Router();
const expensesController = require('../controllers/expensesController');


expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.get('/:id', expensesController.getExpensesById);
expensesRouter.delete('/:id', expensesController.deleteExpenses);
expensesRouter.post('/', expensesController.createExpenses);
expensesRouter.put('/:id', expensesController.updateExpenses);

module.exports = expensesRouter;