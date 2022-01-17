const { Contact } = require("../../model/contact")


const deleteById = async (req, res, next) => {
    const {id} = req.params
    const contact = await Contact.find({_id: id, owner: req.user._id});
    if (!contact) {
        return res.status(401).json({
            Status: "401 Unauthorized",
            ResponseBody: {
            "message": "Email or password is wrong"
            }
        })
    }
    const contacts = await Contact.findByIdAndRemove(id)
    if (contacts) {
      res.json({
        message: "contact deleted",
      })
    } else {
      res.status(404).json({
        message: "Not found",
      })
    }
  }
  module.exports = deleteById