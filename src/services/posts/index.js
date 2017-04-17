'use strict';

const service = require('feathers-mongoose');
const posts = require('./posts-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: posts,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/posts', service(options));

  // Get our initialize service to that we can bind hooks
  const postsService = app.service('/posts');

  // Set up our before hooks
  postsService.before(hooks.before);

  // Set up our after hooks
  postsService.after(hooks.after);
};
