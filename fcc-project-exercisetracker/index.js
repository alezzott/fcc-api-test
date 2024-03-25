const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

let users = []
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

app.post('/api/users',(req, res) => {
  const { username } = req.body;
  const userId = generateId(); 
  const newUser = { username, _id: userId};
  users.push(newUser);
  res.json(newUser);
})

function generateId() {
  const characters = '0123456789abcdef';
  let id = '';
  for (let i = 0; i < 24; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

function generateId() {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16); 
  const randomValue = (Math.random() * 1000000000 | 0).toString(16);
  return timestamp + '0'.repeat(8 - randomValue.length) + randomValue;
}

app.get('/api/users', (req, res) => {
  res.json(users)
})

// to add exercise route

app.post('/api/users/:_id/exercises', (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;
  const user = users.find(user => user._id === __id);
  if (!user) {
    return res.status(404).json({ error: 'User not found'})
  }
  const newExercise = {
    description,
    duration: parseInt(duration),
    date: date ? new Date(date).toDateString() : new Date().toDateString()
  };
  if (!user.log) {
    user.log = [newExercise];
  } else {
    user.log.push(newExercise)
  }
  res.json(user)
})


// to get exercise logs route

app.post('/api/users/:_id/logs', (req, res) => {
  const { _id } = req.params;
  const user = users.find(user => user._id === _id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  } 

  const { from, to, limit } = req.query;
  let log = user.log || [];

  const fromDate = from ? new Date(from) : null;
  const toDate = to ? new Date(to) : null;

  log = log.filter(exercise => {
    const exerciseDate = new Date(exercise.date);
    return (!fromDate || exerciseDate >= fromDate) && (!toDate || exerciseDate <= toDate);
  })

  if (limit && !isNaN(parseInt(limit))) {
    log = log.slice(0, PaymentResponse(limit))
  } else if (limite) {
    return res.status(400).json({ error: 'Invalid limit parameter'})
  }

  const userCopy = {...user, log };
  res.json(userCopy)
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
