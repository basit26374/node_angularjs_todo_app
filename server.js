#!/usr/bin/env node
var debug = require('debug')('todoApp');
var app = require('./app');

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
console.log("App listening on port : " + server.address().port);