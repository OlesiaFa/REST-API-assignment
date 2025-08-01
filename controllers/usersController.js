const {ref, get, set, update, remove} = require('firebase/database');
const db = require('../config/firebase');

//Get all  Users
const getAllUsers = async (req, res) => {
  try {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: 'No users found' });
    }
  } catch (error) {
    console.error('Error reading from RTDB:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
//Get Users by Id
const getUsersById= async (req, res) => {
  try {
    const userRef = ref(db, `users/${req.params.id}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error reading user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

//Create user
//Post
const createUser = async (req, res) => {
  try {
    const userId = String(req.body.id);
    const userData = {
      name: req.body.name,
        username: req.body.username,
        email: req.body.email,       
        address: {
            streeet: req.body.address.street,
            suite: req.body.address.suite,
            city: req.body.address.city,
            zipcode: req.body.address.zipcode
        }
    };

    const userRef = ref(db, `/users/${userId}`);
    await set(userRef, userData);

    res.status(201).json({ message: 'User created', id: userId });
  } catch (error) {
    console.error('Error writing to RTDB:', error);
    res.status(500).json({ error: 'Failed to write data' });
  }
};

//Update User by Id
const updateUser = async(req,res) =>{
  try{
    const userId = req.params.id;
    const userRef = ref(db, `/users/${userId}`);
    
    //chek if user exist
    const snapshot = await get(userRef);
    if(!snapshot.exists()){
      return res.status(404).json({message: 'User not found'})
    } 

    const updateData = req.body;
    await update(userRef, updateData);

    res.status(200).json('User update')
  }catch(error){
    console.error('ErrorDeleting user', error);
    res.status(500).json({error: 'Failed to update user'})
  }  
}

//Delete user by Id
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userRef = ref(db, `users/${userId}`);

    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      return res.status(404).json({ message: 'User not found' });
    }

    await remove(userRef);

    res.status(200).json({ message: 'User deleted', id: userId });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
getAllUsers,
getUsersById,
createUser,
updateUser,
deleteUser
}