
module.exports=((sequelize,DataTypes)=>{
    const Teams = sequelize.define('team',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fullName:DataTypes.STRING,
        place:DataTypes.STRING,
        position:DataTypes.STRING,
        about:DataTypes.STRING,
        image_url:DataTypes.STRING,
        image_alt:DataTypes.STRING,
    })
    return Teams;
})