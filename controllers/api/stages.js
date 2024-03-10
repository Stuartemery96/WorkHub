const Stage = require('../../models/stage');
const Client = require('../../models/client');

module.exports = {
  getAllForUser,
  create,
  edit,
  getStage,
  delete: deleteStage,
};

async function getAllForUser(req, res) {
  const stages = await Stage.find({user: req.user._id}).sort('sequence');
  res.json(stages);
}

async function create(req, res) {
  req.body.user = req.user._id;
  const stages = await Stage.find({clientType: req.body.clientType});
  const sequence = stages.reduce((max, stage) => stage.sequence > max ? stage.sequence : max, 0) + 1;
  req.body.sequence = sequence;
  const stage = await Stage.create(req.body);
  res.json(stage);
}

async function edit(req, res) {
  try {
    const stage = await Stage.findOneAndUpdate({_id: req.body.stageId},
      req.body.stageName, 
      {new: true}
    );
    await stage.save();
    res.json(stage);
  } catch (err) {
    console.log(err);
  }
}

async function getStage(req, res) {
  try {
    const client = await Client.findOne({_id: req.params.clientId});
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    const stage = await Stage.findOne({sequence: client.curStage});
    if (!stage) {
      return res.status(404).json({ error: 'Stage not found for the client' });
    }
    res.json(stage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteStage(req, res) {
  try {
    const stage = await Stage.findById(req.params.stageId);
    if (!stage) {
      return res.status(404).json({ error: 'Stage not found' });
    }
    const updateStages = await Stage.find({ sequence: { $gt: stage.sequence } });
    const updateClients = await Client.find({ curStage: { $gt: stage.sequence } });
    await Promise.all(updateStages.map(async (updateStages) => {
      updateStages.sequence -= 1;
      await updateStages.save();
    }));
    await Promise.all((updateClients).map(async (updateClients) => {
      updateClients.curStage -= 1;
      await updateClients.save();
    }));
    await Stage.findOneAndDelete(stage);
    res.json(updateStages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}