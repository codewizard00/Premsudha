
module.exports=((sequelize,DataTypes)=>{
    const Users = sequelize.define('users',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username:DataTypes.STRING,
        email:DataTypes.STRING,
        gender:DataTypes.STRING,
        password:DataTypes.STRING,
        user_type:DataTypes.STRING,
        phone:DataTypes.STRING,
        email_token:DataTypes.STRING,
        email_verified:DataTypes.INTEGER
    })
    return Users;
})