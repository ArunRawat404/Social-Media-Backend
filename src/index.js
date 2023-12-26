const express = require("express");

const app = express();

const { PORT } = require("./config/server_config.js");
const connect = require("./config/db_config.js");

app.listen(3000, async () => {
    console.log(`Server is up and running on PORT ${PORT}`);
    await connect();
    console.log("DB connected");
});
