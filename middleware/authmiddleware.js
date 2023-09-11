const protect = (req, res, next) => {
    const {user} = req.session;
    
    if(!user) {
        return res.status(404).json({
            success: true,
            message: "Login first!"
        })
    }

    req.user = user
    next()
};

module.exports = protect;