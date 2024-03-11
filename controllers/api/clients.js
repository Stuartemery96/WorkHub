const Client = require('../../models/client')

module.exports = {
  getAllForUser,
  create,
  getClient,
  updateClient,
  addNote,
  updateNote,
  deleteNote,
  changeStage,
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

async function updateNote(req, res) {
  try {
    const client = await Client.findOne({
      'notes._id': req.params.noteId,
      user: req.user._id
    });
    const noteSubDoc = client.notes.id(req.params.noteId);
    if (!client) return res.status(401).json('Unauthorized');
    noteSubDoc.text = req.body.noteText;
    await client.save()
    res.json(client);
  } catch (err) {
    console.log(err);
    res.status(400).json('Update Note Failed');
  }
}

async function deleteNote(req, res) {
  try {
    const client = await Client.findOne({
      'notes._id': req.params.noteId,
      user: req.user._id
    });
    const noteSubDoc = client.notes.id(req.params.noteId);
    if (!client) return res.status(401).json('Unauthorized');
    client.notes.remove(noteSubDoc)
    await client.save()
    res.json(client);
  } catch (err) {
    console.log(err);
    res.status(400).json('Delete Note Failed');
  }
}

async function changeStage(req, res) {
  const client = await Client.findByIdAndUpdate({_id: req.params.clientId}, {curStage: req.body.newStage}, {new: true});
  await client.save();
  res.json(client);
}