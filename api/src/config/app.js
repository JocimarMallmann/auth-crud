const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { authStrategies } = require('../app/users');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({ extended: true })
);

module.exports = app;
