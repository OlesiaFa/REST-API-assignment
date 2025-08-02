const {ref, get, set, update, remove, push} = require('firebase/database');
const db = require('../config/firebase');

//Get all  Expenses
const getAllExpenses = async (req, res) => {
  try {
    const expensesRef = ref(db, 'expenses');
    const snapshot = await get(expensesRef);
    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: 'No expenses found' });
    }
  } catch (error) {
    console.error('Error reading from RTDB:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
}
//Get Expenses by Id
const getExpensesById= async (req, res) => {
  try {
    const expensesRef = ref(db, `expenses/${req.params.id}`);
    const snapshot = await get(expensesRef);

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: 'Expenses not found' });
    }
  } catch (error) {
    console.error('Error reading expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

//Create expenses
//Post
const createExpenses = async (req, res) => {
  try {
    
    const expensesData = {
      savings: {
        rrsp: req.body.savings?.rrsp ?? 0,
        investmentSavings: req.body.savings?.investmentSavings ?? 0,
        longtermSavings: req.body.savings?.longtermSavings ?? 0,
        bonds: req.body.savings?.bonds ?? 0,
        others: req.body.savings?.others ?? 0,
      },
      payment_obligations: {
        credit_card: req.body.payment_obligations?.credit_card ?? 0,
        loan: req.body.payment_obligations?.loan ?? 0,
        vehicle: req.body.payment_obligations?.vehicle ?? 0,
        line_of_credit: req.body.payment_obligations?.line_of_credit ?? 0,
      },
      insurance: {
        life_insurance: req.body.insurance?.life_insurance ?? 0,
        health_insurance: req.body.insurance?.health_insurance ?? 0,
        others: req.body.insurance?.others ?? 0,
      },
      housing: {
        rent: req.body.housing?.rent ?? 0,
        rent_insurance: req.body.housing?.rent_insurance ?? 0,
        storage_parking: req.body.housing?.storage_parking ?? 0,
        utilities: req.body.housing?.utilities ?? 0,
        maintenance: req.body.housing?.maintenance ?? 0,
      },
      utilities: {
        phone: req.body.utilities?.phone ?? 0,
        internet: req.body.utilities?.internet ?? 0,
        water: req.body.utilities?.water ?? 0,
        heat: req.body.utilities?.heat ?? 0,
        electricity: req.body.utilities?.electricity ?? 0,
        cable: req.body.utilities?.cable ?? 0,
        others: req.body.utilities?.others ?? 0,
      },
      personal: {
        transportation: req.body.personal?.transportation ?? 0,
        clothing: req.body.personal?.clothing ?? 0,
        gifts_family: req.body.personal?.gifts_family ?? 0,
        personal_grooming: req.body.personal?.personal_grooming ?? 0,
        dining_out: req.body.personal?.dining_out ?? 0,
        hobbies: req.body.personal?.hobbies ?? 0,
        others: req.body.personal?.others ?? 0,
      }
    };

    const expensesRef = ref(db, '/expenses');
    const newExpensesRef = push(expensesRef);
    await set(newExpensesRef, expensesData);
    res.status(201).json({ message: 'Expenses created', id: newExpensesRef });
  } catch (error) {
    console.error('Error writing to RTDB:', error);
    res.status(500).json({ error: 'Failed to write data' });
  }
};

//Update Expenses by Id
const updateExpenses = async(req,res) =>{
  try{
    const expensesId = req.params.id;
    const expensesRef = ref(db, `/expenses/${expensesId}`);
    
    //chek if expenses exist
    const snapshot = await get(expensesRef);
    if(!snapshot.exists()){
      return res.status(404).json({message: 'Expenses not found'})
    } 

    const updateData = req.body;
    await update(expensesRef, updateData);

    res.status(200).json('Expenses update')
  }catch(error){
    console.error('ErrorDeleting expenses', error);
    res.status(500).json({error: 'Failed to update expenses'})
  }  
}

//Delete expenses by Id
const deleteExpenses = async (req, res) => {
  try {
    const expensesId = req.params.id;
    const expensesRef = ref(db, `expenses/${expensesId}`);

    const snapshot = await get(expensesRef);
    if (!snapshot.exists()) {
      return res.status(404).json({ message: 'Expenses not found' });
    }

    await remove(expensesRef);
    res.status(200).json({ message: 'Expenses deleted', id: expensesId });
  } catch (error) {
    console.error('Error deleting expenses:', error);
    res.status(500).json({ error: 'Failed to delete expenses' });
  }
};

module.exports = {
getAllExpenses,
getExpensesById,
createExpenses,
updateExpenses,
deleteExpenses
}