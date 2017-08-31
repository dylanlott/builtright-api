const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildSchema = new Schema({
  title: { type: String, required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  _parts: [{ type: Schema.Types.ObjectId, ref: 'Part' }],
  started: { type: Date },
  finished: { type: Date },
  url: { type: String },
  forsale: { type: Boolean },
  make: { type: String },
  model: { type: String },
  year: { type: Number },
  trim: { type: String },
  transmission: { type: String, enum: ["automatic", "manual", "other"] },
  options: { type: String },
  description: { type: String },
  meta: { type: Schema.Types.Mixed },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  hidden: { type: Boolean },
  deleted: { type: Boolean },
  upvotes: [{ type: String }],
  downvotes: [{ type: String }]
},{
  timestamps: true
});

BuildSchema.methods.totalUpvotes = function () {
  return this.upvotes.length;
}

BuildSchema.methods.totalDownvotes = function () {
  return this.downvotes.length;
}

BuildSchema.methods.votecount = function () {
  let total = this.downvotes.length + this.upvotes.length;
  return total;
}

module.exports = mongoose.model('Build', BuildSchema);
