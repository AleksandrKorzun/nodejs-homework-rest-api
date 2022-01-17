const { joiRegisterSchema, User } = require("../../model/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const {SECRET_KEY} = process.env;

const signIn = async (req, res, next) => {
    const {error} = await joiRegisterSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            Status: "400 Bad Request",
            "Content-Type": "application/json",
            ResponseBody: "<Ошибка от Joi или другой библиотеки валидации>"
        })
    }
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(401).json({
            Status: "401 Unauthorized",
            ResponseBody: {
            "message": "Email or password is wrong"
            }
        })
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        return res.status(401).json({
            Status: "401 Unauthorized",
            ResponseBody: {
            "message": "Email or password is wrong"
            }
        })
    }
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"})

    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        Status: "200 OK",
        "Content-Type": "application/json",
        ResponseBody: {
        token,
        user: {
            
            email,
            subscription: user.subscription
        }
        }
    })
}
module.exports = signIn;