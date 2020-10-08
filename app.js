var express = require('express');
var path = require('path');
var routes = require('./routes/index')


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_todo_app', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 
app.use(express.static(path.join(__dirname, 'public')));

// Define Routes
app.use('/', routes);

module.exports = app;