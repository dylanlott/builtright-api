'use strict';

const service = require('feathers-mongoose');
const analytics = require('./analytics-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: analytics,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/analytics', service(options));

  // Get our initialize service to that we can bind hooks
  const analyticsService = app.service('/analytics');

  // Set up our before hooks
  analyticsService.before(hooks.before);

  // Set up our after hooks
  analyticsService.after(hooks.after);
};
