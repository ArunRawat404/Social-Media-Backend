const UserService = require("../services/user_service.js");

const userService = new UserService();

async function signup(req, res) {
    try {
        const data = req.body;
        const response = await userService.signup(data);
        return res.status(201).json({
            success: true,
            message: "Successfully created a user",
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating a user",
            data: {},
            err: error
        });
    }
}

async function signin(req, res) {
    try {
        const data = req.body;
        const response = await userService.signin(data);
        return res.status(201).json({
            success: true,
            message: "Successfully signin a user",
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while signin",
            data: {},
            err: error
        });
    }
}

module.exports = {
    signup,
    signin
}