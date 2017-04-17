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
  type: { type: String, enum: ['forum', 'blog'], required: true },
  date: { type: Date, required: true },
  published: { type: Boolean, default: false },
  comments: [{ type: Schema.Types.ObjectId }],
  author: { type: Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const postsModel = mongoose.model('posts', postsSchema);

module.exports = postsModel;
