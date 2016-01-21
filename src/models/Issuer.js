module.exports = function(sequelize, DataTypes) {
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