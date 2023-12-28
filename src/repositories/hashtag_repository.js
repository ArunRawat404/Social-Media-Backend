const Hashtag = require("../models/hashtag.js");
const CrudRepository = require("./crud_repository.js");

class HashtagRepository extends CrudRepository {
    constructor() {
        super(Hashtag)
    };

    async bulkCreate(data) {
        try {
            const hashtags = await Hashtag.insertMany(data);
            return hashtags;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async getHashtagByName(text) {
        try {
            const hashtag = await Hashtag.find({ text: text });
            return hashtag;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
};

module.exports = HashtagRepository;