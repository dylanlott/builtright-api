'use strict';

// comments-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'user' },
  flagged: { type: Boolean },
  hidden: { type: Boolean },
  rating: { type: Number },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const commentsModel = mongoose.model('comments', commentsSchema);

module.exports = commentsModel;
