const express = require("express");
const app = express();
const cors = require("cors")
const dotenv = require('dotenv')
dotenv.config({ path: "Config/config.env" })
require("./Database/index")
app.use(express.json({ limit: "50mb", extended: 'true' }))
app.use(cors());
const userRouter = require("./Routes/userRoute");
const teamRouter = require("./Routes/teamRoute");
const competionRouter = require("./Routes/competionRoutes");
const bookRouter = require("./Routes/bookRoutes");
const emailRouter = require("./Routes/emailServices");

app.use("/",userRouter)
app.use("/",teamRouter)
app.use("/",competionRouter)
app.use("/",bookRouter);
app.use("/",emailRouter)

app.listen(process.env.PORT, () => {
    console.log(`The port is running on ${'http://localhost:'+process.env.PORT}`)
})