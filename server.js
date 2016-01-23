// SEP PCC 2015
'use strict';

var Hapi = require('hapi');
var path = require('path');
const fs = require('fs');
var config = require('./src/config/config.json');
var routes = require('./src/routes/routes.js');
var plugins = require('./src/plugins/plugins.js');

const server = new Hapi.Server();

server.connection({
	host: config.server.hostname,
	port: config.server.https_port,
	tls: {
		key: fs.readFileSync(path.join(__dirname, config.https.key), 'utf8'),
		cert: fs.readFileSync(path.join(__dirname, config.https.cert), 'utf8')
	},
	labels: 'https'
});

server.connection({
	host: config.server.hostname,
	port: config.server.port,
	labels: 'http'
});

// Export the server to be required elsewhere.
module.exports = server;

// Main setup
var setup = function() {
	// Register all plugins
	server.register(plugins, function (err) {
		if (err) {
			throw err; // Something bad happened while loading plugins
		}
	});

	// Redirect all http requests to https connection (not the very best solution due to possible MITM attack, recheck this)
	server.select('http').route({
		method: '*',
		path: '/{p*}',
		handler: function (request, reply) {
			consle.log("HTTP REDIRECT TRIGGERED! URL PATH: " + request.url.path);
			return reply().redirect('https://' + config.server.hostname + ":" + config.server.https_port + request.url.path).permanent();
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
		console.log('Servers running at:', server.select('http').info.uri + " and " + server.select('https').info.uri);
	});
