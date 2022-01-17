const bcrypt = require('bcrypt')
const {BadRequest, Conflict} = require('http-errors')

const { joiRegisterSchema, User } = require("../../model/user")


const signUp = async (req, res, next) => {
    const {error} = joiRegisterSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            Status: "400 Bad Request",
            "Content-Type": "application/json",
            ResponseBody: "<Ошибка от Joi или другой библиотеки валидации>"
        })
    };
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        return res.status(409).json({
            Status: "409 Conflict",
            "Content-Type": "application/json",
            ResponseBody: {
                "message": "Email in use"
                }   
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({email, password: hashPassword})
    res.status(201).json({
        "Status": "201 Created",
        "Content-Type": "application/json",
        ResponseBody:{
            user: {
                email,
                subscription: newUser.subscription
            }
        }
       
    })
};

module.exports = signUp;