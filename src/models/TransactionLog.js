module.exports = function(sequelize, DataTypes) {
    var Log = sequelize.define('transaction_log',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            issuerId: {
                type: DataTypes.STRING,
				unique: true,
				allowNull: false
            },
			data: {
				type: DataTypes.STRING,
				allowNull: false
			}
        },
        {
            tableName: 'transaction_log',
            timestamps: false
        }
    );

    return Log;
};