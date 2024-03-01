const Client = require('../../models/client')

module.exports = {
  getAllForUser,
  create,
  getClient,
  updateClient,
};

async function getAllForUser(req, res) {
  try {
    const clients = await Client.find({user: req.user._id}).sort('name');
    res.json(clients);
  } catch (err) {
    console.log(err)
  }
}

async function create(req, res) {
  try {
    req.body.user = req.user._id;
    const client = await Client.create(req.body);
    res.json(client);
  } catch (err) {
    console.log(err)
  }
}

async function getClient(req, res) {
  try {
    const client = await Client.findOne({_id: req.params.clientId});
    res.json(client);
  } catch (err) {
    console.log(err)
  }
}

async function updateClient(req, res) {
  try{
    const client = await Client.findByIdAndUpdate(req.params.clientId, req.body, {new: true});
    res.json(client);
  } catch (err) {
    console.log(err)
  }
}
