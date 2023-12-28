const TweetService = require("../services/tweet_service.js");

const tweetService = new TweetService();

async function createTweet(req, res) {
    try {
        const data = req.body;
        const response = await tweetService.createTweet(data);
        return res.status(201).json({
            success: true,
            message: "Successfully created a tweet",
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating a tweet",
            data: {},
            err: error
        });
    }
}

async function getTweet(req, res) {
    try {
        const tweetId = req.params.id;
        const response = await tweetService.getTweet(tweetId);
        return res.status(201).json({
            success: true,
            message: "Successfully fetched a tweet",
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching a tweet",
            data: {},
            err: error
        });
    }
}

module.exports = {
    createTweet,
    getTweet
}