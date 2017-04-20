'use strict';

// parts-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partsSchema = new Schema({
  name: { type: String, required: true },
  make: { type: String },
  model: { type: String },
  trim: { type: String },
  price: { type: Number },
  url: { type: String },
  comments: [{type: Schema.Types.ObjectId, ref: 'comments'}],
  owner: { type: Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const partsModel = mongoose.model('parts', partsSchema);

module.exports = partsModel;
