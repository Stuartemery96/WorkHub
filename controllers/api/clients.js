const Client = require('../../models/client')

module.exports = {
  getAllForUser,
  create,
};

async function getAllForUser(req, res) {
  const clients = await Client.find({user: req.user._id}).sort('name');
  res.json(clients);
}

async function create(req, res) {
  req.body.user = req.user._id;
  const client = await Client.create(req.body);
  res.json(client);
}