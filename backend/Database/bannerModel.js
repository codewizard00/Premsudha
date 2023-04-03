
module.exports = ((sequelize, DataTypes) => {
    const Books = sequelize.define('banner', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image_url: DataTypes.TEXT('long'),
        image_mobile_url: DataTypes.TEXT('long'),
        image_alt: DataTypes.TEXT('long'),
        banner_type: DataTypes.TEXT('long'),
        banner_about:DataTypes.TEXT('long'),
        banner_about:DataTypes.TEXT('long'),
    })
    return Books;
})