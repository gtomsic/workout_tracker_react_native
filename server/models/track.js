module.exports = (sequelize, DataTypes) => {
    const track = sequelize.define("track", {
        user_id: { type: DataTypes.UUID, allowNull: false },
        name: { type: DataTypes.STRING },
        title: { type: DataTypes.STRING },
    });
    return track;
};
