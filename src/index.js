const express = require("express");
const router = require("./routes/index.js");

const app = express();

const { PORT } = require("./config/server_config.js");
const connect = require("./config/db_config.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(3000, async () => {
    console.log(`Server is up and running on PORT ${PORT}`);
    await connect();
    console.log("DB connected");
});
