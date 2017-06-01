'use strict';

// posts-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, enum: ['forum', 'blog'], required: true, default: 'forum' },
  date: { type: Date, required: true },
  flagged: { type: Boolean, default: false },
  reports: [{ type: Schema.Types.Mixed }],
  published: { type: Boolean, default: false, required: true},
  _comments: [{ type: Schema.Types.ObjectId }],
  user: { type: String, required: true},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const postsModel = mongoose.model('posts', postsSchema);

module.exports = postsModel;
