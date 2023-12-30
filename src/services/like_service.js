const TweetRepository = require("../repositories/tweet_repository.js");
const LikeRepository = require("../repositories/like_repository.js");
const CommentRepository = require("../repositories/comment_repository.js");

class LikeService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.likeRepository = new LikeRepository();
        this.commentRepository = new CommentRepository();
    };

    async toggleLike(data) {
        let likeable;
        try {
            if (data.modelType == "Tweet") {
                likeable = await this.tweetRepository.get(data.modelId);
            } else if (data.modelType == "Comment") {
                likeable = await this.commentRepository.get(data.modelId);
            }
        } catch (error) {
            throw error;
        }
        const exists = await this.likeRepository.findByUserAndLikable({
            user: data.userId,
            onModel: data.modelType,
            likeable: data.modelId
        });
        let isAdded;
        if (exists) {
            likeable.likes.pull(exists.userId);
            await likeable.save();
            try {
                await this.likeRepository.destroy({ _id: exists._id });
            } catch (error) {
                console.log(error)
                throw error;
            }
            isAdded = false;
        } else {
            const newLike = await this.likeRepository.create({
                user: data.userId,
                onModel: data.modelType,
                likeable: data.modelId
            });
            likeable.likes.push(newLike);
            await likeable.save();
            isAdded = true;
        }
        return isAdded;
    };
};

module.exports = LikeService;
