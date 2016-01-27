// TEMPORARY TEST SERVER - ISSUER SIMULATOR

'use strict'

let Hapi = require('hapi');
const Good = require('good');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8002
});

// Add the route for response (test)
server.route({
	method: 'POST',
	path:'/api/issuer/{id?}',
	handler: function (request, reply) {
		var data = JSON.parse('{"acquirerInfo": {"orderId": "1","timestamp": "25.01.2016 22:31:33"},"issuerInfo": {"id": "123456","orderId": "12","timestamp": "25.01.2016 22:31:36","transactionAmount": "5000.00"},"transactionStatus": {"code": "00","message": "TRANSACTION_COMPLETED"}}');
		console.log(data);
		reply(data);
	}
});

// Log
server.register({
	register: Good,
	options: {
		reporters: [{
			reporter: require('good-console'),
			events: {
				response: '*',
				log: '*',
				error: '*',
				info: '*'
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
		console.log('Issuer server running at:', server.info.uri);
	});
});
