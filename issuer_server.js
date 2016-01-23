// TEST SERVER - ISSUER SIMULATOR

'use strict'

var Hapi = require('hapi');
const Good = require('good');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8001
});

// Add the route (test)
server.route({
	method: 'POST',
	path:'/api/issuer/123456',
	handler: function (request, reply) {
		console.log("Received POST from " + request.payload);
		var data = JSON.parse(request.payload);

		data = JSON.stringify('{"pan": "1234567891111112", "securityCode": 123, "cardHolderName": "Goran Todorovic", "cardExpirationDate": "12.11.2016","acquirerOrderId": 1,"acquirerTimestamp": 1453491049,"transactionAmount": 24652.2,"issuerOrderId": 1, "issuerTimestamp": 1553491048}');

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
		console.log('Issuer Server running at:', server.info.uri);
	});
});
