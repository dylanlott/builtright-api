const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildSchema = new Schema({
  title: { type: String, required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _parts: [{ type: Schema.Types.ObjectId, ref: 'Part' }],
  info: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  hidden: { type: Boolean },
  deleted: { type: Boolean },
  votes: [ type: String ]
},{
  timestamps: true
});

BuildSchema.methods.votecount = function () {
  return this.votes.length;
}

module.exports = mongoose.model('Build', BuildSchema);
