const { json } = require('body-parser');
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = require('../models/Todo');

/* GET /todos listing. */
// Get/Fetch all tasks
router.get('/', function(req, res, next) {
    Todo.find(function(err, todos_list) {
        if (err) return next(err);
        return res.json(todos_list);
    });
});

/* POST /todos */
// Add/Create new task
router.post('/', function(req, res, next) {
    Todo.create(req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /todos/:id */
// Remove task by id
router.delete('/:id', function(req, res, next) {
    Todo.findByIdAndRemove(req.params.id, req.body, function(err, post) {
        if (err) return next(err);
        res.json(post)
    });
})

module.exports = router;