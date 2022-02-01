const { User } = require("../../model/user");


const getVerify = async (req, res, next) => {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if(!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null
    })
    res.json({
        message: 'Verification successful',
      })
}
module.exports = getVerify;