const Client = require('../../models/client')

module.exports = {
  getAllForUser,
  create,
  getClient,
  updateClient,
  addNote,
};

async function getAllForUser(req, res) {
  try {
    const clients = await Client.find({user: req.user._id}).sort('name');
    res.json(clients);
  } catch (err) {
    console.log(err);
    res.status(400).json('Fetch Clients Failed');
  }
}

async function create(req, res) {
  try {
    req.body.user = req.user._id;
    const client = await Client.create(req.body);
    res.json(client);
  } catch (err) {
    console.log(err);
    res.status(400).json('Create Client Failed');
  }
}

async function getClient(req, res) {
  try {
    const client = await Client.findOne({_id: req.params.clientId});
    res.json(client);
  } catch (err) {
    console.log(err);
    res.status(400).json('Fetch Client Failed');
  }
}

async function updateClient(req, res) {
  try{
    const client = await Client.findByIdAndUpdate(req.params.clientId, req.body, {new: true});
    res.json(client);
  } catch (err) {
    console.log(err);
    res.status(400).json('Update Client Failed');
  }
}

async function addNote(req, res) {
  try {
    const client = await Client.findOne({
      _id: req.params.clientId,
      user: req.user._id
    });
    if (!client) return res.status(401).json('Unauthorized');
    client.notes.push(req.body);
    await client.save();
    res.json(client);
  } catch (err) {
    console.log(err);
    res.status(400).json('Add Note Failed');
  }
}