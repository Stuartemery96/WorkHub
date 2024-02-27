const express = require('express');
const router = express.Router();
const clientsCtrl = require('../../controllers/api/clients');

// All Routes begin with '/api/clients'

// GET /api/clients
router.get('/', clientsCtrl.getAllForUser);
// POST /api/clients
// router.post('/', clientsCtrl.create);

module.exports = router;