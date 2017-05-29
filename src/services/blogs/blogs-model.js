'use strict';

// blogs-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: String, required: true},
  published: { type: Boolean, default: false },
  comments: [{ type: Schema.Types.ObjectId }],
  tags: [{ type: String, default: 'general' }],
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const blogsModel = mongoose.model('blogs', blogsSchema);

module.exports = blogsModel;
