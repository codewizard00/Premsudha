
module.exports = ((sequelize, DataTypes) => {
    const Competitions = sequelize.define('competitions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: DataTypes.STRING,
        place: DataTypes.STRING,
        timings: DataTypes.STRING,
        content: DataTypes.TEXT('long'),
        image_url: DataTypes.STRING,
        image_alt: DataTypes.STRING,
    })
    return Competitions;
})