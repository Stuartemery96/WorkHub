const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const Stage = require('../../models/stage');

module.exports = {
  create,
  login,
  checkToken,
};

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    const stages = await Stage.create([
      { user: user._id, name: 'Pre-Approval', clientType: 'Buyer', sequence: 1 },
      { user: user._id, name: 'Searching', clientType: 'Buyer', sequence: 2 },
      { user: user._id, name: 'Under Contract', clientType: 'Buyer', sequence: 3 },
      { user: user._id, name: 'Closed', clientType: 'Buyer', sequence: 4 },
      { user: user._id, name: 'Marketing', clientType: 'Seller', sequence: 1 },
      { user: user._id, name: 'Active', clientType: 'Seller', sequence: 2 },
      { user: user._id, name: 'Pending', clientType: 'Seller', sequence: 3 },
      { user: user._id, name: 'Closed', clientType: 'Seller', sequence: 4 },
  ]);
    // yes we can send back just a string
    return res.json(token);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
}

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // Data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}