const User = require("../models/user.js");
const CrudRepository = require("./crud_repository.js");

class UserRepository extends CrudRepository {
    constructor() {
        super(User)
    };

    async findBy(data) {
        try {
            const response = await User.findOne({ email: data });
            return response;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
};

module.exports = UserRepository;