const Stage = require('../../models/stage')

module.exports = {
  getAllForUser,
  create,
};

async function getAllForUser(req,res) {
  const stages = await Stage.find({user: req.user._id});
  res.json(stages);
}

async function create(req,res) {
  req.body.user = req.user._id
  const stages = await Stage.find({clientType: req.body.clientType});
  const sequence = stages.length + 1;
  req.body.sequence = sequence;
  const stage = await Stage.create(req.body);
  res.json(stage);
}
