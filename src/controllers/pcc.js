'use strict'

const models = require('../models');
const request = require('request');
const boom = require('boom');
const server = require('../../server.js');
const Issuer = models.Issuer;
const Log = models.TransactionLog;

module.exports = {
	issuerLog:function (request, reply) {
		if (request.params.id == null || request.params.id === 'undefined')
			return reply(JSON.parse('{"transactionStatus":{"code": "04", "message": "REQUEST_FORMAT_ERROR"}}'));

		Log.findAll({
			where: {
				issuerId: request.params.id
			}
		}).then(function(data) {
			return reply(data);
		});
	},

	auth:function(req, reply) {
		// Check if we have a valid JSON data sent
		try {
			JSON.parse(req.payload);
		}
		catch (e) {
			return reply(JSON.parse('{"transactionStatus":{"code": "04", "message": "REQUEST_FORMAT_ERROR"}}'));
		}

		var reqJson = JSON.parse(req.payload);
		var issuerId = reqJson.cardInfo.pan.slice(0, 6); // Issuer ID (first 6 chars from PAN)
		Issuer.findAll({
			where: {
				pan: issuerId
			}
		}).then(function (data) {
			request({
				url: data[0]['dataValues'].url + issuerId,
				method: "POST",
				json: JSON.stringify(req.payload)
			},
			function (error, response, data) {
				if (response.headers['content-type'].indexOf('json') === -1) {
					return reply(JSON.parse('{"transactionStatus":{"code": "04", "message": "REQUEST_FORMAT_ERROR"}}'));
				}
				if (!error && response.statusCode === 200) {
						// Log transaction data between Acquirer and Issuer in case of errors or lost data!
						Log.create({
							acquirerOrderId: data.acquirerInfo.orderId,
							acquirerTimestamp: data.acquirerInfo.timestamp,
							transactionAmount: reqJson.transactionAmount,
							issuerId: issuerId,
							issuerOrderId: data.issuerInfo.orderId,
							issuerTimestamp: data.issuerInfo.timestamp,
							statusCode: data.transactionStatus.code,
							statusMessage: data.transactionStatus.message
						}).then(function(log) {
							console.log("Transaction log data inserted with ID = " + log.get('id'));
						});

						// Return response to acquirer server with JSON dana sent from Issuer
						return reply(data);
				}
				else {
					return reply(JSON.parse('{"transactionStatus":{"code": "05", "message": "SERVER_ERROR"}}'));
				}
			});
		})
	}
};
