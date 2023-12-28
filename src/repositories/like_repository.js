const Like = require("../models/like.js");
const CrudRepository = require("./crud_repository.js");

class LikeRepository extends CrudRepository {
    constructor() {
        super(Like)
    };
};

module.exports = LikeRepository;