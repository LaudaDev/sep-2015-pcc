// SEP PCC 2015

var Hapi = require('hapi');

// Create a server with a localhost and port 8080
var server = new Hapi.Server();
server.connection({ 
  host: '0.0.0.0', 
  port: process.env.PORT || 8080
});

server.route({
  method: 'GET',
  path:'/', 
  handler: function (request, reply) {
    reply('Hi, testing! :)');
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});