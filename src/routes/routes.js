// SEP-PCC REST ROUTES
'use strict'

const controllers = require('../controllers');
const joi = require('joi');

module.exports = [
	{
		method: 'GET',
		path:'/api/sep/log/{id?}',
		config: {
			handler: controllers.pcc.issuerLog,
			validate: {
				params: {
					id: joi.number().integer().required()
				},
				failAction: function (request, reply, source, error) {
					return reply(JSON.parse('{"error":{"code": "04", "message": "REQUEST_FORMAT_ERROR"}}'));
				}
			}
		}
	},
	{
		method: 'POST',
		path:'/api/sep/auth',
		config: {
			handler: controllers.pcc.auth,
			validate: {
				headers: joi.object({
					'content-type': joi.string().valid([
						'application/json',
						'application/json;charset=utf-8',
						'application/json; charset=utf-8'
					]).insensitive().required()
				}).options({ allowUnknown: true }),
				payload: {
					cardInfo: joi.object({
						pan: joi.string().alphanum().min(16).max(16).required(),
						securityCode: joi.number().integer().min(100).max(999).required(),
						holderName: joi.string().required(),
						expirationDate: joi.string().required()
					}).required(),
					acquirerInfo: joi.object({
						orderId: joi.number().integer().required(),
						timestamp: joi.string().required()
					}).required(),
					transactionAmount: joi.number().required()
				},
				failAction: function (request, reply, source, error) {
					return reply(JSON.parse('{"transactionStatus":{"code": "04", "message": "REQUEST_FORMAT_ERROR"}}'));
				}
			}
		}
	}
];
