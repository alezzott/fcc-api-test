const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  let { date } = req.params;

  let dateObj;
  if (!date) {
    dateObj = new Date();
  } else {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      dateObj = new Date(date);
    } else {
      dateObj = new Date(parseInt(date));
    }
    if (isNaN(dateObj.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  }

  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
