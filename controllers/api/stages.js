const Stage = require('../../models/stage')

module.exports = {
  getAllForUser,
  create,
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
