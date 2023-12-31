const UserRepository = require("../repositories/user_repository.js");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    };

    async signup(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            throw error;
        }
    };

    async signin(data) {
        try {
            const email = data.email;
            const password = data.password;
            const user = await this.userRepository.findBy({ email: email });
            // if user not exist
            if (!user) {
                throw {
                    message: "Wrong credentials"
                };
            }
            // if password is wrong
            if (!user.comparePassword(password)) {
                throw {
                    message: "Wrong credentials"
                };
            }
            const token = user.generateJwt();
            return token;
        } catch (error) {
            throw error;
        }
    };
};

module.exports = UserService;