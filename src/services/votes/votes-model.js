'use strict';

// votes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  count: { type: Number, required: true },
  user: { type: String, required: true },
  source: { type: String, required: true }, // what was upvoted - comment, post, build, etc...
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const votesModel = mongoose.model('votes', voteSchema);

module.exports = votesModel;
