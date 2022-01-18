const {Contact} = require('../../model/contact');

const getById = async (req, res, next) => {
    const {id} = req.params
    const contact = await Contact.find({_id: id, owner: req.user._id})
    if (contact) {
      res.json(contact)
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  }

  module.exports = getById