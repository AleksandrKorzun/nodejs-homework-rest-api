const {Schema, model} = require('mongoose');
const joi = require('joi')

const emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

const userSchema = Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
  }
);


const joiRegisterSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const joiUpdateSubscriptionSchema = joi.object({
  subscription: joi.string().required()
})

const User = model('user', userSchema);


module.exports = {
    User,
    joiRegisterSchema,
    joiUpdateSubscriptionSchema,
};