const express = require('express')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json())

const usersRouter = require('./routes/usersRouter.js');
const incomeRouter = require('./routes/incomeRouter.js');
const expensesRouter = require('./routes/expensesRouter.js');


app.use('/users', usersRouter);
app.use('/income', incomeRouter);
app.use('/expenses', expensesRouter);


const PORT = 3000;

//Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Firebase Realtime DB API');
});

app.post('/test', (req, res) => {
  console.log('Test req.body:', req.body);
  res.json({ receivedBody: req.body });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
