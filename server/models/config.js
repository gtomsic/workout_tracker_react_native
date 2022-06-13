module.exports = (sequelize, DataTypes) => {
    const config = sequelize.define("config", {
        user_id: { type: DataTypes.UUID, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
    });
    return config;
};
