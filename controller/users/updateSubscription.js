const { User, joiUpdateSubscriptionSchema } = require("../../model/user");

const updateSubscription = async (req, res, next) => {
    const {error} = joiUpdateSubscriptionSchema.validate(req.body);
    if (error) {
        return res.status(404).json({message: error.message})
    };
    const {subscription} = req.body;
    console.log(subscription)
    const {_id} = req.user;
    const userUpdate = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
    res.json(userUpdate);
}
module.exports = updateSubscription;