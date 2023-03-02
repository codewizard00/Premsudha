
module.exports = ((sequelize, DataTypes) => {
    const Competitions = sequelize.define('competitions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: DataTypes.TEXT('long'),
        place: DataTypes.TEXT('long'),
        timings: DataTypes.TEXT('long'),
        content: DataTypes.TEXT('long'),
        about:DataTypes.TEXT('long'),
        image_url: DataTypes.TEXT('long'),
        image_alt: DataTypes.TEXT('long'),
        keyword: DataTypes.TEXT('long'),
    })
    return Competitions;
})