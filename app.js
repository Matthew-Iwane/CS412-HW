// app.js
const express = require('express');
const app = express();
const ps4Routes = require('./routes/ps4Routes');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/ps4', ps4Routes);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
