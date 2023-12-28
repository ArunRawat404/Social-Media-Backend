const Hashtag = require("../models/hashtag.js");

class HashtagRepository {
    async create(data) {
        try {
            const hashtag = await Hashtag.create(data);
            return hashtag;
        } catch (error) {
            console.log(error)
            throw error;
        }
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

    async getHashtag(id) {
        try {
            const hashtag = await Hashtag.findById(id);
            return hashtag;
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

    async deleteHashtag(id) {
        try {
            const hashtag = await Hashtag.findByIdAndDelete(id);
            return hashtag;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
};

module.exports = HashtagRepository;