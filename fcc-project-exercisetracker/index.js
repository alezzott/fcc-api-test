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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let users = [];

app.post('/api/users', (req, res) => {
  const { username } = req.body;
  const userId = generateId();
  const newUser = { username, _id: userId };
  users.push(newUser);
  res.json(newUser);
});

function generateId() {
  const characters = '0123456789abcdef';
  let id = '';
  for (let i = 0; i < 24; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

app.get('/api/users', (req, res) => {
  res.json(users)
})

// to add exercise route
app.post('/api/users/:_id/exercises', (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  const user = users.find(user => user._id === _id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const exercise = {
    _id: user._id,
    username: user.username,
    date: date ? new Date(date).toDateString() : new Date().toDateString(),
    duration: parseInt(duration),
    description: String(description)
  };

  if (!user.log) {
    user.log = [exercise];
  } else {
    user.log.push(exercise);
  }

  res.json(exercise);
});


// to get exercise logs route
app.get('/api/users/:_id/logs', (req, res) => {
  const { _id } = req.params;

  const user = users.find(user => user._id === _id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  let { from, to, limit } = req.query;

  let log = user.log || [];
  if (from) {
    log = log.filter(exercise => new Date(exercise.date) >= new Date(from));
  }
  if (to) {
    log = log.filter(exercise => new Date(exercise.date) <= new Date(to));
  }
  if (limit) {
    log = log.slice(0, parseInt(limit));
  }
  
  const response = {
    _id: user._id,
    username: user.username,
    count: log.length,
    log: log.map(exercise => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date
    }))
  };

  res.json(response);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
