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
// DELETE /api/stages/:stageId
router.delete('/:stageId', stagesCtrl.delete);
// PUT /api/stages/:stageId/move/:direction
router.put('/:stageId/sequence', stagesCtrl.updateSeq);

module.exports = router;