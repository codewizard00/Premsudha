
module.exports=((sequelize,DataTypes)=>{
    const Books = sequelize.define('books',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title:DataTypes.STRING,
        image:DataTypes.STRING,
        image_alt:DataTypes.STRING,
        writer:DataTypes.STRING,
        about:DataTypes.STRING,
        url:DataTypes.STRING,
    })
    return Books;
})