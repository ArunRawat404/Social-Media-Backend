const express = require("express");
const passport = require("passport");
const router = require("./routes/index.js");

const app = express();

const { PORT } = require("./config/server_config.js");
const connect = require("./config/db_config.js");
const passportAuth = require("./middlewares/jwt_middleware.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passportAuth(passport);

app.use("/api", router);

app.listen(3000, async () => {
    console.log(`Server is up and running on PORT ${PORT}`);
    await connect();
    console.log("DB connected");
});
