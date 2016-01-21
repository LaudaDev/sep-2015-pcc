var models = require('../models');
var request = require('request');

module.exports = {
	
	status:function (request, reply) {
		reply('Server is online');
	},
	hi:function (request, reply) {
		var Issuer = models.Issuer;
		
		Issuer.findAll().then(function (res) {
			console.log(res);
			reply(res);
		});
	},
	
	auth:function(req, res) {
		// var pan = str.slice(0,6); // get first 6 chars
		console.log("Received POST from " + req.payload);
		
		res(req.payload);
	}
	
};