// SEP-PCC REST ROUTES

var controllers = require('../controllers');

module.exports = [
	{ 
		method: 'GET',
		path:'/api/sep/hi', 
		handler: controllers.pcc.hi
	}, 
	
	{ 
		method: 'GET',
		path:'/hi', 
		handler: function (request, reply) {
		return reply('Hi! Testing! :)');
		
		}
	}, 
	
	{ 
		method: 'GET',
		path:'/api/sep/status', 
		handler: controllers.pcc.status
	}, 
	
	{ 
		method: 'POST',
		path:'/api/sep/auth', 
		handler: controllers.pcc.auth
	}

];