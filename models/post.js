const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String },
  text: { type: String, required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  votes: [ type: String ]
});

PostSchema.methods.votecount = function () {
  return this.votes.length;
}

module.exports = mongoose.model('Post', PostSchema);
