const express = require('express')
const cors = require('cors')
const app = express();
const {ref, set, get, update, remove} = require('firebase/database')
const usersRouter = require('./routes/usersRouter.js');
const db = require('./config/firebase')
app.use(express.json())
app.use(cors());
app.use('/', usersRouter);

const PORT = 3000;

//Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Firebase Realtime DB API');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
