
module.exports=((sequelize,DataTypes)=>{
    const Users = sequelize.define('users',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username:DataTypes.TEXT('long'),
        email:DataTypes.TEXT('long'),
        gender:DataTypes.TEXT('long'),
        password:DataTypes.TEXT('long'),
        user_type:DataTypes.TEXT('long'),
        phone:DataTypes.TEXT('long'),
        email_token:DataTypes.TEXT('long'),
        email_verified:DataTypes.INTEGER
    })
    return Users;
})