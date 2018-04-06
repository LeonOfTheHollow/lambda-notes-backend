const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./api/routes/routes');
const helmet = require('helmet');
const catalog = require('./routes/catalog');
const compression = require('compression');

const port = process.env.PORT || 3030;

const server = express();
const corsOptions = {
  "origin": "*",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
};

server.use(compression());
server.use(helmet());
server.use(bodyParser.json());
server.use(cors(corsOptions));

mongoose
  .connect("mongodb://localhost/notes")
  .then(conn => {
    console.log("Successfully Connected to Notes database!");
  })
  .catch(err => {
    console.log("Database connection failed. . .");
  });

routes(server);

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});

module.exports = {
  server
};