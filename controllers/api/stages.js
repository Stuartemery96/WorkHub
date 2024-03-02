const Stage = require('../../models/stage');
const Client = require('../../models/client');

module.exports = {
  getAllForUser,
  create,
  edit,
  getStage,
};

async function getAllForUser(req,res) {
  const stages = await Stage.find({user: req.user._id}).sort('sequence');
  res.json(stages);
}

async function create(req,res) {
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

async function getStage(req,res) {
  const client = await Client.findOne({_id: req.params.clientId})
  const stage = await Stage.findOne({sequence: client.curStage})
  res.json(stage);
}