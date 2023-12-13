// routes/ps4Routes.js
const express = require('express');
const router = express.Router();
const request = require('request');
const fetch = require('node-fetch');
const redis = require('redis');
const config = require('../config');

const client = redis.createClient();

router.post('/promise', async (req, res) => {
  try {
    const cacheKey = 'promiseCacheKey';

    // Check if the data is in the cache
    client.get(cacheKey, async (error, cachedData) => {
      if (error) throw error;

      if (cachedData) {
        // If cached data exists, return it
        res.json({ data: JSON.parse(cachedData), fromCache: true });
      } else {
        // If not in cache, fetch from API
        const apiResponse = await fetchDataFromApi(config.externalApiUrl);
        
        // Cache the response with a 15-second timeout
        client.setex(cacheKey, 15, JSON.stringify(apiResponse));

        res.json({ data: apiResponse, fromCache: false });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Similar modifications for other routes...

// Helper function to fetch data from API
async function fetchDataFromApi(apiUrl) {
  const response = await fetch(apiUrl);
  return response.json();
}

module.exports = router;
