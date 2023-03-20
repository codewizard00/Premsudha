
module.exports=((sequelize,DataTypes)=>{
    const Writer = sequelize.define('writer',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:DataTypes.TEXT('long'),
        image:DataTypes.TEXT('long'),
        image_alt:DataTypes.TEXT('long'),
        gender:DataTypes.TEXT('long'),
        place:DataTypes.TEXT('long'),
    })
    return Writer;
})