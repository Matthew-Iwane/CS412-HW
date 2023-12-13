// routes/ps4Routes.js
const express = require('express');
const router = express.Router();
const request = require('request');
const fetch = require('node-fetch');
const config = require('../config'); // Adjust the path as needed

router.post('/promise', (req, res) => {
  // Using Promises
  new Promise((resolve, reject) => {
    request(config.externalApiUrl, (error, response, body) => {
      if (error) reject(error);
      else resolve(body);
    });
  })
    .then(data => res.render('result', { data }))
    .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
});

router.post('/async-await', async (req, res) => {
  // Using async/await
  try {
    const response = await fetch(config.externalApiUrl);
    const data = await response.json();
    res.render('result', { data });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/callback', (req, res) => {
  // Using callbacks
  request(config.externalApiUrl, (error, response, body) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.render('result', { data: body });
    }
  });
});

router.get('/search-form', (req, res) => {
  res.render('searchForm');
});

router.post('/search', (req, res) => {
  const searchString = req.body.searchString;
  // Use the search string as needed (e.g., in API requests)
  res.send(`Search string submitted: ${searchString}`);
});

module.exports = router;
