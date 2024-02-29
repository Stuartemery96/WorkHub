const express = require('express');
const router = express.Router();
const stagesCtrl = require('../../controllers/api/stages');

// All Routes begin with '/api/stages'

// GET /api/stages
router.get('/', stagesCtrl.getAllForUser);
// POST /api/stages/stage
router.post('/', stagesCtrl.create);
// PUT /api/stages
router.put('/', stagesCtrl.edit);
// GET /api/stage/:clientId
router.get('/:clientId', stagesCtrl.getStage);

module.exports = router;