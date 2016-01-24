// SEP-PCC REST ROUTES

var controllers = require('../controllers');

module.exports = [
	{
		method: 'GET',
		path:'/hi',
		handler: function (request, reply) {
		return reply('{hi: "This is test!", work: "Maybe :)"}');
		}
	},

	{
		method: 'GET',
		path:'/api/sep/log/{id}',
		handler: controllers.pcc.issuerLog
	},

	{
		method: 'POST',
		path:'/api/sep/auth',
		handler: controllers.pcc.auth
	}
];
