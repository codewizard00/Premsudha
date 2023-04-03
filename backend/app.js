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
const bannerRouter = require("./Routes/bannerRoutes");
const writerRouter = require("./Routes/writerRoutes");
const writerContent = require("./Routes/writerContent");
const resultRouter = require("./Routes/resultRoutes");
app.use(express.limit('10mb'));
app.use("/", userRouter)
app.use("/", teamRouter)
app.use("/", competionRouter)
app.use("/", bookRouter);
app.use("/", emailRouter)
app.use("/", bannerRouter);
app.use("/", writerRouter);
app.use("/", writerContent);
app.use("/", resultRouter)


app.listen(process.env.PORT, () => {
    console.log(`The port is running on ${'http://localhost:' + process.env.PORT}`)
})