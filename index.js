// Importing Node modules and initializing Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const socketEvents = require('./socketEvents');
const config = require('./config/main');
const cluster = require('cluster');
const os = require('os');
const path = require('path');

let server;

mongoose.Promise = require('bluebird');

if(cluster.isMaster) {
  var numWorkers = require('os').cpus().length;

  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for(var i = 0; i < numWorkers; i++) {
      cluster.fork();
  }

  cluster.on('online', function(worker) {
      console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  if (process.env.NODE_ENV !== config.test_env) {
    server = app.listen(config.port);
    console.log(`Your server is running on port ${config.port}.`);
  } else {
    server = app.listen(config.test_port);
  }
}

console.log(`Connecting to mongo ${config.database}`);
mongoose.connect(config.database, {
  useMongoClient: true
});

const io = require('socket.io').listen(server);

socketEvents(io);

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
// app.use(express.static(path.join(__dirname, '..', '/client')));

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

router(app);

module.exports = server;
