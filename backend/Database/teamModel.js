
module.exports=((sequelize,DataTypes)=>{
    const Teams = sequelize.define('team',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fullName:DataTypes.TEXT('long'),
        place:DataTypes.TEXT('long'),
        position:DataTypes.TEXT('long'),
        about:DataTypes.TEXT('long'),
        image_url:DataTypes.TEXT('long'),
        image_alt:DataTypes.TEXT('long'),
    })
    return Teams;
})