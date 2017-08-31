const comment = require('../controllers/comment.js');
const express = require('express');
const commentsRouter = express.Router();

commentsRouter.get('/', comment.list);
commentsRouter.post('/', comment.create);
commentsRouter.delete('/:id', comment.delete);

module.exports = commentsRouter;
