'use strict';

// analytics-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  action: { type: String },
  intent: { type: String },
  event: { type: String },
  data: { type: Schema.Types.Mixed },
  name: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const analyticsModel = mongoose.model('analytics', analyticsSchema);

module.exports = analyticsModel;
