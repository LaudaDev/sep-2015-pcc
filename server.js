// SEP PCC 2015
'use strict';

var Hapi = require('hapi');
var path = require('path');
var config = require('./src/config/config.json');
var routes = require('./src/routes/routes.js');
var plugins = require('./src/plugins/plugins.js');

const server = new Hapi.Server();


server.connection({ 
	host: config.server.hostname, 
	port: config.server.port
});

// Export the server to be required elsewhere.
module.exports = server;

// Main setup
var setup = function(done) {

	//Register all plugins/utils
	server.register(plugins, function (err) {
		if (err) {
			throw err; // Something bad happened while loading a plugin
		}
	});

  // Add the server routes
  server.route(routes);

};
// Start the server
	server.start((err) => {
		if (err) {
			throw err;
		}
		setup(); // Run setup
		console.log('Server running at:', server.info.uri);
	});
	