var models = require('../models');
var request = require('request');
const isReachable = require('is-reachable');
var Issuer = models.Issuer;

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
		var obj = JSON.parse(req.payload);
		var issuerId = obj.pan.slice(0,6); // get first 6 chars

		console.log("PAN: " + issuerId);

		var x = Issuer.findAll({
			where: {
				pan: issuerId
			}
		}).then(function (data) {
			console.log("URL REQUEST: " + data[0]['dataValues'].url + issuerId + "/" + JSON.stringify(req.payload));
			
			request({
				url: data[0]['dataValues'].url + issuerId,
				method: "POST",
				json: JSON.stringify(req.payload)
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
						console.log("BODY: " + body)
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
