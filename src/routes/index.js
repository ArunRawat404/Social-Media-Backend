const express = require("express");
const { createTweet, getTweet } = require("../controllers/tweet_controller.js")
const { signup, signin } = require("../controllers/user_controller.js");
const { toggleLike } = require("../controllers/like_controller.js");

const router = express.Router();

router.post("/tweets", createTweet);

router.get("/tweets/:id", getTweet);

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/likes/toggle", toggleLike);

module.exports = router;
