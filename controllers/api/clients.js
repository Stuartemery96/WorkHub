const Client = require('../../models/client')

module.exports = {
  getAllForUser,
  // create,
};

async function getAllForUser(req, res) {
  const clients = await Client.find({user: req.user._id}).sort('name');
  res.json(clients);
}