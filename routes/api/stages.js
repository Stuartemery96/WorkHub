const express = require('express');
const router = express.Router();
const stagesCtrl = require('../../controllers/api/stages');

// All Routes begin with '/api/stages'

// GET /api/stages
router.get('/', stagesCtrl.getAllForUser);
// POST /api/stages/
router.post('/', stagesCtrl.create);
// PUT /api/stages
router.put('/', stagesCtrl.edit);
// GET /api/stages/:clientId
router.get('/:clientId', stagesCtrl.getStage);
// DELETE /api/stages/:stage:id
router.delete('/:stageId', stagesCtrl.delete);

module.exports = router;