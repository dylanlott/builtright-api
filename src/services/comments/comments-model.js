'use strict';

// comments-model.js - A mongoose model
//
// `source` is what the comment is in regards to / relations to.
//  can be the mongo id of a post, blog, build, event, etc...
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  text: { type: String, required: true },
  user: { type: String, ref: 'user' }, // user email for ease of querying
  displayName: { type: String }, // if user has a displayName
  flagged: { type: Boolean },
  hidden: { type: Boolean },
  source: { type: String }, // can be _id of post, blog, part, build, etc...
  votes: [{ type: Schema.Types.ObjectId, ref: 'votes' }],
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const commentsModel = mongoose.model('comments', commentsSchema);

module.exports = commentsModel;
