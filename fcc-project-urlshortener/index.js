require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: true}));

const urlDatabase = {};
let shortUrlCounter = 1

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url

  try {
    const urlObject = new URL (originalUrl);
    dns.lookup(urlObject.hostname, (err) => {
      if (err) {
        res.json({ error: 'invalid url'})
      } else {
        urlDatabase[shortUrlCounter] = originalUrl;
        const shortUrl = shortUrlCounter++;
        res.json({ original_url: originalUrl, short_url: shortUrl})
      }
    })
  } catch(err) {
    res.json({ error: 'invalid url'})
  }
})

app.get('/api/shorturl/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  const originalUrl = urlDatabase[shortUrl];
  if (originalUrl) {
    res.redirect(originalUrl)
  } else {
    res.json({ error: 'invalid short url'})
  }
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
