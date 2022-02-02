const { transporter } = require("../../helpers");
const { User } = require("../../model/user");

const {SITE_NAME} = process.env;


const setVerify = async (req, res, next)=>{
    const {email} = req.body;
        if(!email){
            return res.status(400).json({
                message: "missing required field email"
            })
        }
        const user = await User.findOne({email});
        if(!user) {
            return req.status(404).json({
                message: "User not found"
            })
        }
        if(user.verify){
            return res.status(400).json({
                message: "Verification has already been passed"
            })
        }
        const {verificationToken} = user;
        const mail = {
            to: email,
            from: "oleksandr.korzun@meta.ua",
            subject: "verification email",
            html: `<a target="_blank" href="${SITE_NAME}/api/users/verify/${verificationToken}">Потвердите свой email</a>`,
        };
        await transporter.sendMail(mail);
        res.json({
            message: "Verification email sent"
          })
}
module.exports = setVerify;