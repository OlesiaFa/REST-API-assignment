const express = require('express');
const incomeRouter = express.Router();
const incomeController = require('../controllers/incomeController');


incomeRouter.get('/', incomeController.getIncome);
incomeRouter.get('/:id', incomeController.getIncomeById);
incomeRouter.delete('/:id', incomeController.deleteIncome);
incomeRouter.post('/', incomeController.createIncome);
incomeRouter.put('/:id', incomeController.updateIncome);

module.exports = incomeRouter;