
module.exports = ((sequelize, DataTypes) => {
    const Books = sequelize.define('banner', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image_url: DataTypes.STRING,
        image_alt: DataTypes.STRING,
        banner_type: DataTypes.STRING,
    })
    return Books;
})