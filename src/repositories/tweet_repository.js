const Tweet = require("../models/tweet.js");
const CrudRepository = require("./crud_repository.js");

class TweetRepository extends CrudRepository {
    constructor() {
        super(Tweet)
    };
};

module.exports = TweetRepository;