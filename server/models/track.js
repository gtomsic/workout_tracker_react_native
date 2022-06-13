module.exports = (sequelize, DataTypes) => {
    const track = sequelize.define("track", {
        user_id: { type: DataTypes.UUID, allowNull: false, unique: true },
    });
    return track;
};
