var http = require('http');
var url = require('url');
var utils = ('./utilities');
var oldUmask = process.umask(0000);

//routes
var index = require('./routes/index');
var telegram = require('./routes/telegram');
var routes = {
  '/': index,
  '/telegram': telegram
};

//server
var server = http.createServer(function(request, response) {
  var parts = url.parse(request.url);
  var route = routes[parts.pathname];
  
  if (route) {
    route(request, response);
  } else {
    utils.sendResponse(response, "Not found", 404);
  }
});
server.listen('/var/run/apps/apps-api.sock', function() {
  process.umask(oldUmask);
});