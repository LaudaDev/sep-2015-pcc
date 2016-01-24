module.exports = function(sequelize, DataTypes) {
	// Issuer DB model based on db_install.sql data
	var Issuer = sequelize.define('issuer',
	{
		id: {
			type: DataTypes.INTEGER,
				primaryKey: true,
		},
		pan: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'issuer',
		timestamps: false
	}
	);

	return Issuer;
};
