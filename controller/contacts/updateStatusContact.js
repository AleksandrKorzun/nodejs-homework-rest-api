const {Contact, joiContactUpdateFavoriteSchema} = require('../../model/contact');

const updateStatusContact = async (req, res, next) =>{
    const { error } = joiContactUpdateFavoriteSchema.validate(req.body)
    if (error) {
        return res.status(404).json({message: error.message})
    }
    const { favorite } = req.body;
    const { id } = req.params;
    const contact = await Contact.findOne({_id: id, owner: req.user._id});
    if (!contact) {
        return res.status(401).json({
            Status: "401 Unauthorized",
            ResponseBody: {
            "message": "Email or password is wrong"
            }
        })
    }
    const updateContact = await Contact.findByIdAndUpdate(id, {favorite}, { new: true });
    if (!updateContact) {
        return res.status(404).json({message: "Not Found"});
    }
    res.json(updateContact)
}

module.exports = updateStatusContact