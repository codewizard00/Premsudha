
module.exports=((sequelize,DataTypes)=>{
    const Results = sequelize.define('results',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        writer:DataTypes.STRING,
        writer_img:DataTypes.STRING,
        writer_alt:DataTypes.STRING,
        position:DataTypes.STRING,
        place:DataTypes.STRING,
        certificate:DataTypes.STRING,
        competition_id:DataTypes.STRING,
    })
    return Results;
})