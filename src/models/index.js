var Sequelize = require('sequelize');
var config = require('../config/config.json');

// initialize database connection
var sequelize = new Sequelize(config.db.mysql_db, config.db.mysql_user, config.db.mysql_pass, {
	host: config.db.mysql_host,
	port: config.db.mysql_port,
	dialect: 'mysql',
	  pool: {
		max: 5,
		min: 0,
		idle: 10000
	  }
	});

// load models
var models = [
  'Issuer',
  'TransactionLog'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// export connection
module.exports.sequelize = sequelize;

