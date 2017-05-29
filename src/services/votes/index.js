'use strict';

const service = require('feathers-mongoose');
const vote = require('./votes-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: vote,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/votes', service(options));

  // Get our initialize service to that we can bind hooks
  const votesService = app.service('/votes');

  // Set up our before hooks
  votesService.before(hooks.before);

  // Set up our after hooks
  votesService.after(hooks.after);
};
