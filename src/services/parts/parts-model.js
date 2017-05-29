'use strict';

// parts-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partsSchema = new Schema({
  name: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  trim: { type: String },
  description: { type: String },
  specs: { type: Schema.Types.Mixed },
  price: { type: Number, required: true },
  url: { type: String, required: true },
  source: { type: String }, // site part was scraped from
  user: { type: String, ref: 'user', required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const partsModel = mongoose.model('parts', partsSchema);

module.exports = partsModel;
