'use strict';

const service = require('feathers-mongoose');
const builds = require('./builds-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: builds,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/builds', service(options));

  // Get our initialize service to that we can bind hooks
  const buildsService = app.service('/builds');

  // Set up our before hooks
  buildsService.before(hooks.before);

  // Set up our after hooks
  buildsService.after(hooks.after);
};
