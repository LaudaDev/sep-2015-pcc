// SEP-PCC REST ROUTES

var controllers = require('../controllers');

module.exports = [
	{
		method: 'GET',
		path:'/api/sep/log/{id?}',
		handler: controllers.pcc.issuerLog
	},
	{
		method: 'POST',
		path:'/api/sep/auth',
		handler: controllers.pcc.auth
	}
];
