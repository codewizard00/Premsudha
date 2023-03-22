
module.exports=((sequelize,DataTypes)=>{
    const WriterContent = sequelize.define('writerContent',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        writer_id:DataTypes.TEXT('long'),
        title:DataTypes.TEXT('long'),
        content:DataTypes.TEXT('long'),
        type:DataTypes.TEXT('long'),
    })
    return WriterContent;
})