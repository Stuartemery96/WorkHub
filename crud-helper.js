// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
// const Stage = require('./models/stage');


// Local variables will come in handy for holding retrieved documents
let user, stage;
let users, stages;