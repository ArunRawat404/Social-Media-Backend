const LikeService = require("../services/like_service.js");

const likeService = new LikeService();

async function toggleLike(req, res) {
    try {
        const data = req.body;
        const response = await likeService.toggleLike(data);
        return res.status(201).json({
            success: true,
            message: "Successfully toggled liked",
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while toggling like",
            data: {},
            err: error
        });
    }
}

module.exports = {
    toggleLike
}