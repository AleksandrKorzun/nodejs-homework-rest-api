const {Contact} = require('../../model/contact');

const add = async (req, res, next) => {
    const newContact = await Contact.create({...req.body, owner: req.user._id})
    res.status(201).json(newContact)
  };

  module.exports = add;