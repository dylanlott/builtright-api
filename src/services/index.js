'use strict';
const analytics = require('./analytics');
const events = require('./events');
const posts = require('./posts');
const comments = require('./comments');
const parts = require('./parts');
const builds = require('./builds');
const authentication = require('./authentication');
const user = require('./user');
const health = require('./health');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(builds);
  app.configure(comments);
  app.configure(parts);
  app.configure(posts);
  app.configure(events);
  app.configure(health);
  app.configure(analytics);
};
