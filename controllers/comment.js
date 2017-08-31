const Comment = require('../models/comment.js');

exports.create = (req, res, next) => {
  const newComment = new Comment(req.body);
  return newComment.save()
    .then(comment => res.status(201).json(comment))
    .catch(err => res.status(500).send(err));
}

exports.list = (req, res, next) => {
  return Comment.find(req.params)
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).send(err));
}

exports.delete = (req, res, next) => {
  return Comment.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) res.status(500).send(err);
    return res.status(203).json(doc);
  });
}
