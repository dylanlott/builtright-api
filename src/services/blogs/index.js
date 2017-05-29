'use strict';

const service = require('feathers-mongoose');
const blogs = require('./blogs-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: blogs,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/blogs', service(options));

  // Get our initialize service to that we can bind hooks
  const blogsService = app.service('/blogs');

  // Set up our before hooks
  blogsService.before(hooks.before);

  // Set up our after hooks
  blogsService.after(hooks.after);
};
