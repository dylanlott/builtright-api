const Build = require('../models/build.js');

exports.create = (req, res, next) => {
  const newBuild = new Build(req.body);
  newBuild.save()
    .then(build => res.status(201).json(build))
    .catch(err => res.status(500).send(err));
}

exports.list = (req, res, next) => {
  return Build.find(req.params)
    .then(builds => res.status(200).json(builds))
    .catch(err => res.status(500).send(err));
}

exports.detail = (req, res, next) => {
  return Build.findById(req.params.id)
    .then(build => res.status(200).json(build))
    .catch(err => res.status(500).send(err));
}

exports.update = (req, res, next) => {
  const updated = req.body;
  return Build.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, build) => {
      if (err) res.status(500).send(err);
      return res.status(203).json(build);
    });
}

exports.delete = (req, res, next) => {
  return Build.findByIdAndUpdate(
    req.params.id,
    {$set: {deleted: true}},
    (err, build) => {
      res.status(203).json(build)
    });
}
