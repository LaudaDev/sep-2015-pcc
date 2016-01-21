var config = require('../config/config.json');

module.exports = [
	// Setting up 'good' to log everything!
	{
		register:require('good'),
		options:{
			reporters: [{
				reporter: require('good-console'),
				events: {
					response: '*',
					request: '*',
					ops: '*',
					error: '*',
					info: '*',
					log: '*'
				}
			}]
		}
	}

  
  // Add additional plugins here!
];