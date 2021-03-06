var http = require('http');
var url = require('url');
var oldUmask = process.umask(0000);

//ENV variables
var socketPath = process.env['SOCKET_PATH'];

//routes
var index = require('./routes/index.js');
var telegram = require('./routes/telegram.js');
var ping = require('./routes/ping.js');
var routes = {
  '/': index,
  '/telegram': telegram,
  '/ping': ping
};

//server
var server = http.createServer(function(request, response) {
  var parts = url.parse(request.url);
  var route = routes[parts.pathname];
  
  if (route) {
    route(request, response);
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});

console.log("Trying to listen on " + socketPath);

server.listen(socketPath, function() {
  process.umask(oldUmask);
  console.log('Server bound');
});
