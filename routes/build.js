const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const build = require('../controllers/build.js');
const express = require('express');
const buildRoutes = express.Router();

buildRoutes.get('/', build.list);
buildRoutes.post('/', build.create);
buildRoutes.get('/:id', build.detail);
buildRoutes.put('/:id', build.update);
buildRoutes.delete('/:id', build.delete);

module.exports = buildRoutes;
