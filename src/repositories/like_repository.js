const Like = require("../models/like.js");
const CrudRepository = require("./crud_repository.js");

class LikeRepository extends CrudRepository {
    constructor() {
        super(Like)
    };

    async findByUserAndLikable(data) {
        try {
            const like = await Like.findOne(data);
            return like;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = LikeRepository;