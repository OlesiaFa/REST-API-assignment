const {ref, get, set, update, remove, push} = require('firebase/database');
const db = require('../config/firebase');

//Get all  Income
const getIncome = async (req, res) => {
  try {
    const incomeRef = ref(db, 'income');
    const snapshot = await get(incomeRef);
    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: 'No income found' });
    }
  } catch (error) {
    console.error('Error reading from RTDB:', error);
    res.status(500).json({ error: 'Failed to fetch income' });
  }
}


//Get income by Id
const getIncomeById= async (req, res) => {
  try {
    const incomeRef = ref(db, `income/${req.params.id}`);
    const snapshot = await get(incomeRef);

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: 'Income not found' });
    }
  } catch (error) {
    console.error('Error reading income:', error);
    res.status(500).json({ error: 'Failed to fetch income' });
  }
};

const createIncome = async (req, res) => {
  try {
 
    const incomeData = {
      wages: req.body.wages,
      secondaryIncome: req.body.secondaryIncome,
      interest: req.body.interest,
      supportPayment: req.body.supportPayment,
      others: req.body.others
    };

    const incomeRef = ref(db, 'income');
    const newIncomeRef = push(incomeRef)
    await set(newIncomeRef, incomeData);
    res.status(201).json({ message: 'Income created', id: newIncomeRef.key });
  } catch (error) {
    console.error('Error writing to RTDB:', error);
    res.status(500).json({ error: 'Failed to write data' });
  }
};


//Update Income by Id
const updateIncome = async(req,res) =>{
  try{
    const incomeId = req.params.id;
    const incomeRef = ref(db, `/income/${incomeId}`);
    
    //chek if income exist
    const snapshot = await get(incomeRef);
    if(!snapshot.exists()){
      return res.status(404).json({message: 'Income not found'})
    } 

    const incomeData = req.body;
    await update(incomeRef, incomeData);

    res.status(200).json('Income update')
  }catch(error){
    console.error('ErrorDeleting income', error);
    res.status(500).json({error: 'Failed to update income'})
  }  
}


//Delete Income by Id
const deleteIncome = async (req, res) => {
  try {
    const incomeId = req.params.id;
    const incomeRef = ref(db, `income/${incomeId}`);

    const snapshot = await get(incomeRef);
    if (!snapshot.exists()) {
      return res.status(404).json({ message: 'Income not found' });
    }

    await remove(incomeRef);

    res.status(200).json({ message: 'Income deleted', id: incomeId });
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ error: 'Failed to delete income' });
  }
};

module.exports = {
getIncome,
getIncomeById,
createIncome,
updateIncome,
deleteIncome
}
