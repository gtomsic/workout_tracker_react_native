module.exports = (sequelize, DataTypes) => {
    const location = sequelize.define("location", {
        user_id: { type: DataTypes.UUID, allowNull: false },
        track_id: { type: DataTypes.INTEGER, allowNull: false },
        timestamp: { type: DataTypes.INTEGER },
        latitude: { type: DataTypes.INTEGER },
        longitude: { type: DataTypes.INTEGER },
        altitude: { type: DataTypes.INTEGER },
        accuracy: { type: DataTypes.INTEGER },
        heading: { type: DataTypes.INTEGER },
        speed: { type: DataTypes.INTEGER },
    });
    return location;
};
