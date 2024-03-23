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

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  if (!date) {
    return handleDateResponse(res, new Date());
  }

  const dateObj = new Date(date);
  const isValidDate = !isNaN(dateObj.getTime());
  const isValidUnixNumber = /^[0-9]+$/.test(date);

  if (isValidDate) {
    return handleDateResponse(res, dateObj);
  } else if (isValidUnixNumber) {
    return handleDateResponse(res, new Date(parseInt(date)));
  } else {
    return res.json({ error: "Invalid Date" });
  }
});

function handleDateResponse(res, dateObj) {
  const unix = dateObj.getTime();
  const utc = dateObj.toUTCString();
  return res.json({ unix, utc });
}

const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
