
module.exports=((sequelize,DataTypes)=>{
    const Results = sequelize.define('results',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        writer:DataTypes.TEXT('long'),
        writer_img:DataTypes.TEXT('long'),
        writer_alt:DataTypes.TEXT('long'),
        position:DataTypes.TEXT('long'),
        place:DataTypes.TEXT('long'),
        certificate:DataTypes.TEXT('long'),
        competition_id:DataTypes.TEXT('long'),
    })
    return Results;
})