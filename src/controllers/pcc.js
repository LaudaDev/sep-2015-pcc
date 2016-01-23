var models = require('../models');
var request = require('request');
const isReachable = require('is-reachable');
var Issuer = models.Issuer;
var Log = models.TransactionLog;

module.exports = {

	status:function (request, reply) {
		reply('Server is online');
	},
	hi:function (request, reply) {

		console.log(request);

		Issuer.findAll().then(function (res) {
		//	console.log(res);
			reply(res);
		});
	},

	auth:function(req, res) {
		console.log("Received POST from " + req.payload);
		var reqJson = JSON.parse(req.payload);
		var issuerId = reqJson.pan.slice(0, 6); // get first 6 chars

		Issuer.findAll({
			where: {
				pan: issuerId
			}
		}).then(function (data) {
			request({
				url: data[0]['dataValues'].url + issuerId,
				method: "POST",
				json: JSON.stringify(req.payload)
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
						var tmpData = JSON.parse(body);

						// Log transaction data between Acquirer and Issuer in case of errors or lost data!
						Log.create({
							acquirerOrderId: tmpData.acquirerOrderId,
							acquirerTimestamp: tmpData.acquirerTimestamp,
							transactionAmount: tmpData.transactionAmount,
							issuerId: issuerId,
							issuerOrderId: tmpData.issuerOrderId,
							issuerTimestamp: tmpData.issuerTimestamp
						}).then(function(log){
							console.log("Transaction log data inserted with ID = " + log.get('id'));
						});

						// Return response to acquirer server with JSON dana sent from Issuer
						res(body);
				}
				else {
					console.log("error: " + error)
					console.log("response.statusCode: " + response.statusCode)
					console.log("response.statusText: " + response.statusText)
					res('{error: "Invalid response from Issuer server!", code: ' + response.statusCode + '}');
				}
			});

		})
	}

};
