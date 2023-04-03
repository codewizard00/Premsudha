const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBHOSTNAME, process.env.DBPASSWORD, {
    host: "database-1.cuopifprbbm4.ap-south-1.rds.amazonaws.com",
    port:"3306",
    dialect: "mysql",
    logging: false,
    pool: { max: 5, min: 0, idle: 10000 }
})


sequelize.authenticate()
    .then(() => {
        console.log("connected")
    }).catch((err) => {
        console.log("Error :", err)
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ alter: true, match: /Premsudha$/ })
    .then(() => {
        console.log("yes re-sync");
    })

db.users = require('./userModel')(sequelize, DataTypes);
db.teams = require('./teamModel')(sequelize, DataTypes);
db.competions = require("./competitionModel")(sequelize, DataTypes);
db.results = require("./resultModel")(sequelize, DataTypes);
db.books = require("./bookModel")(sequelize, DataTypes);
db.banner = require("./bannerModel")(sequelize,DataTypes);
db.writer = require("./writerModel")(sequelize,DataTypes);
db.writerContent = require("./writerContentModel")(sequelize,DataTypes);

module.exports = db;