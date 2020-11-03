const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const { authStrategies } = require('../app/users');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Expose-Headers', 'Authorization, Date');
  app.use(cors());
  next();
})

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ extended: true })
);

module.exports = app;
