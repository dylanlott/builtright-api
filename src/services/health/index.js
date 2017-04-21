'use strict';

const api = require('./apispec.json');

module.exports = function() {
  const app = this;

  app.use('/health', function(req, res) {
    res.status(200).send('OK');
  });

  app.use('/', function(req, res) {
    res.status(200).json(api);
  })
}
