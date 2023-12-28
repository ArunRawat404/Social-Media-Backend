const express = require("express");
const { createTweet, getTweet } = require("../controllers/tweet_controller.js")

const router = express.Router();

router.post("/tweets", createTweet);

router.get("/tweets/:id", getTweet);

module.exports = router;
