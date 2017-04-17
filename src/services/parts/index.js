'use strict';

const service = require('feathers-mongoose');
const parts = require('./parts-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: parts,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/parts', service(options));

  // Get our initialize service to that we can bind hooks
  const partsService = app.service('/parts');

  // Set up our before hooks
  partsService.before(hooks.before);

  // Set up our after hooks
  partsService.after(hooks.after);
};
