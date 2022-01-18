const { User } = require("../../model/user");


const logOut = async (req, res, next) => {
    
    try {
        await User.findByIdAndUpdate(req.user._id, {token: null});
        res.status(204).send();
    } catch (error) {
        next(error)
    }
};

module.exports = logOut;