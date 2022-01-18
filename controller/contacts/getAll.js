const {Contact} = require('../../model/contact')

const getAll = async (req, res, next) => {
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
    const contacts = await Contact.find(
      req.query.hasOwnProperty("favorite") ? {favorite: req.query.favorite, owner: req.user._id} :{owner: req.user._id},
      "-createdAt -updatedAt",
      {skip, limit: +limit},
      )
    res.json(contacts)
  };
  
module.exports = getAll;