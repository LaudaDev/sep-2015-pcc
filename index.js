// SEP PCC 2015
'use strict';

var Hapi = require('hapi');
const Good = require('good');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
	host: 'localhost', 
	port: 8000 
});

// Add the route (test)
server.route({
	method: 'GET',
	path:'/hi', 
	handler: function (request, reply) {
		return reply('Hi! Testing! :)');
	}
});

// Database test
server.register(
	[
		{
			register: require('hapi-sequelize'),
			options: {
				database: 'sep_pcc',
				user: 'root',
				pass: '',
				dialect: 'mysql',
				port: 3306,
				models: 'models/**/*.js',
				sequelize: {
					define: {
						underscoredAll: true
					}
				}
			}
		},
	], function(err) {
		if (err) {
			console.error('Failed to load hapi-sequelize plugin!');
		}
	}
);

// Log 
server.register({
	register: Good,
	options: {
		reporters: [{
			reporter: require('good-console'),
			events: {
				response: '*',
				log: '*'
			}
		}]
	}
}, (err) => {
	if (err) {
		throw err; // Failed loading "good" plugin!
    }

	// Start the server
	server.start((err) => {
		if (err) {
			throw err;
		}
		console.log('Server running at:', server.info.uri);
	});
});
