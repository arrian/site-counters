// run using 'node server.js' in the directory to serve

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic('./')).listen(8081);