const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/server_config");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String
    },
    bio: {
        type: String
    },
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
});

// to hash the password before storing in db
userSchema.pre("save", function (next) {
    const encryptedPassword = bcrypt.hashSync(this.password, parseInt(SALT_ROUNDS));
    this.password = encryptedPassword;
    next();
});

userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;