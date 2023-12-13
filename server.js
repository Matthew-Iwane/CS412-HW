const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const client = redis.createClient();
const fetch = require('node-fetch');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

const checkCache = (req, res, next) => {
  const key = req.body.searchString; 
  client.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.json({ data: JSON.parse(data), source: 'cache' });
    } else {
      next();
    }
  });
};

router.post('/ps4', checkCache, async (req, res) => {
  const searchString = req.body.searchString; 
  const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts'; 

  try {
    const apiResponse = await fetch(apiEndpoint);
    const result = await apiResponse.json();

    client.setex(searchString, 15, JSON.stringify(result));

    res.json({ data: result, source: 'api' });
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
