const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "User must have name."]
    },
    password: {
        type: String,
        require: [true, "User must have a password"]
    }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;