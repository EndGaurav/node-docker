const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");


exports.signup = async(req, res) => {
    const {username, password} = req.body;
    try {
        const hashPasswd = await bcryptjs.hash(password, 10)
        const newUser = await User.create({
            username, 
            password: hashPasswd
        });
        req.session.user = newUser;
        res.status(200).json({
            success: true,
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            success: "fail"
        })
    }
}

exports.login = async(req, res) => {
    const {username, password} = req.body;
    
    try {
        const user = await User.findOne({username}); 
        if(!user) {
            return res.status(404).json({
                success: "fail",
                message: "User not found"
            })
        }
        const iscorrect = await bcryptjs.compare(password, user.password);
        if(iscorrect) {
            req.session.user = user;
            res.status(201).json({
                success: true,
            }) 
        } else {
            return res.status(404).json({
                success: "fail",
                message: "Incorrect username or password"
            })
        }
    } catch (err) {
        res.status(400).json({
            success: "fail"
        })
    }
}

exports.getAllUsers = async (req, res) => {
    
    try {
        const users = await User.find()
        res.status(200).json({
            success: true,
            number_of_user: users.length,
            data: {
                user: users
            }
        })

    } catch (err) {
        res.status(400).json({
            success: "fail"
        })
    }
}

exports.deleteUser = async (req, res) => {
    
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid user id."
            })
        }
        res.status(200).json({
            success: true,
            user: user.username,
            message: "User Successfully deleted."
        })
    } catch (err) {
        res.status(400).json({
            success: "fail"
        })
    }
}