
module.exports=((sequelize,DataTypes)=>{
    const Books = sequelize.define('books',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title:DataTypes.TEXT('long'),
        image:DataTypes.TEXT('long'),
        image_alt:DataTypes.TEXT('long'),
        writer:DataTypes.TEXT('long'),
        about:DataTypes.TEXT('long'),
        url:DataTypes.TEXT('long'),
    })
    return Books;
})