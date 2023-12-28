const TweetRepository = require("../repositories/tweet_repository.js");
const HashtagRepository = require("../repositories/hashtag_repository.js");

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    };

    async createTweet(data) {
        const content = data.content;
        const hashtagRegex = /#+[a-zA-Z0-9(_)]+/g;
        // getting all hashtags(without #) and converting them to lowercase
        const hashtags = content.match(hashtagRegex).map(tag => tag.substring(1).toLowerCase());

        // removing hashtags and whitespace from tweet data
        const formatted_data = data;
        formatted_data.content = formatted_data.content.split("#")[0].trim()
        const tweet = await this.tweetRepository.create(formatted_data);

        await this.createHashtags(hashtags, tweet);

        return tweet;
    };

    async createHashtags(hashtags, tweet) {
        // checking if hashtag already present 
        let alreadyPresentHashtagsObj = await this.hashtagRepository.getHashtagByName(hashtags);
        let alreadyPresentHashtags = alreadyPresentHashtagsObj.map(tag => tag.text);

        // tags which are not present in database
        const newHashtags = hashtags.filter(tag => !alreadyPresentHashtags.includes(tag));

        newHashtags = newHashtags.map(tag => {
            return {
                text: tag,
                tweets: [tweet.id]
            };
        });

        // storing new hashtags to database
        await this.hashtagRepository.bulkCreate(newHashtags);

        alreadyPresentHashtags.forEach(tag => {
            tag.tweets.push(tweet.id);
            tag.save();
        });
    };

    async getTweet(tweetId) {
        const tweet = await this.tweetRepository.getTweet(tweetId);
        return tweet;
    };
};

module.exports = TweetService;