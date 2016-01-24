var models = require('../models');
var request = require('request');
var boom = require('boom');
var Issuer = models.Issuer;
var Log = models.TransactionLog;

module.exports = {
	issuerLog:function (request, reply) {
		if (request.params.id == null || request.params.id === 'undefined')
			return reply(boom.notFound('Invalid ID parameter sent'));

		Log.findAll({
			where: {
				issuerId: request.params.id
			}
		}).then(function(data) {
			reply(data);
		});
	},

	auth:function(req, reply) {
		if (req.payload == null)
			return reply(boom.notFound('Invalid request sent'));

		var reqJson = JSON.parse(req.payload);
		var issuerId = reqJson.pan.slice(0, 6); // get first 6 chars from pan to identify issuer

		Issuer.findAll({
			where: {
				pan: issuerId
			}
		}).then(function (data) {
			request({
				url: data[0]['dataValues'].url + issuerId,
				method: "POST",
				json: JSON.stringify(req.payload)
			}, function (error, response, data) {
				if (!error && response.statusCode === 200) {
						var data = JSON.parse(data);

						// Log transaction data between Acquirer and Issuer in case of errors or lost data!
						Log.create({
							acquirerOrderId: data.acquirerOrderId,
							acquirerTimestamp: data.acquirerTimestamp,
							transactionAmount: data.transactionAmount,
							issuerId: issuerId,
							issuerOrderId: data.issuerOrderId,
							issuerTimestamp: data.issuerTimestamp
						}).then(function(log){
							console.log("Transaction log data inserted with ID = " + log.get('id'));
						});

						// Return response to acquirer server with JSON dana sent from Issuer
						return reply(data);
				}
				else {
					return reply(boom.serverTimeout('Issuer server unavailable'));
				}
			});
		})
	}
};
