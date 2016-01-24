module.exports = function(sequelize, DataTypes) {
	// TransactionLog DB model based on db_install.sql data
	var TransactionLog = sequelize.define('transaction_log',
	{
		acquirerOrderId: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: false
		},
		acquirerTimestamp: {
			type: DataTypes.STRING,
			allowNull: false
		},
		transactionAmount: {
			type: DataTypes.FLOAT(10,2),
			allowNull: false
		},
		issuerId: {
				type: DataTypes.INTEGER,
				allowNull: false
		},
		issuerOrderId: {
			type: DataTypes.INTEGER,
			unique: true,
			allowNull: false
		},
		issuerTimestamp: {
			type: DataTypes.STRING,
			allowNull: false
		},
	},
	{
		tableName: 'transaction_log',
		timestamps: false
	}
	);

	return TransactionLog;
};
