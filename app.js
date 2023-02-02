require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const connectDb = require("./src/configs/db");
//routes
const cors = require("cors");
const userRoutes = require("./src/Routes/user.routes");
const alertRoutes = require("./src/Routes/alert.routes");
const Authenticate = require("./src/middlewares/auth.middleware");
app.use(cors());

//connecting to mongod Db
connectDb();
app.use("/api/auth", userRoutes);
app.use("/api/alert",Authenticate, alertRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(
    `Listening on Port ${port} and running in ${process.env.NODE_ENV}`
  );
});
