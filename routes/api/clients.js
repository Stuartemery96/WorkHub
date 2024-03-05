const express = require('express');
const router = express.Router();
const clientsCtrl = require('../../controllers/api/clients');

// All Routes begin with '/api/clients'

// GET /api/clients
router.get('/', clientsCtrl.getAllForUser);
// POST /api/clients
router.post('/', clientsCtrl.create);
// GET /api/clients/:clientId
router.get('/:clientId', clientsCtrl.getClient);
// PUT /api/clients/:clientId
router.put('/:clientId', clientsCtrl.updateClient);
// PUT /api/clients/:clientId/stage
router.put('/:clientId/stage', clientsCtrl.changeStage);
// POST /api/clients/:clientId/notes
router.post('/:clientId/notes', clientsCtrl.addNote);
// PUT /api/clients/:clientId/notes/:noteId
router.put('/:clientId/notes/:noteId', clientsCtrl.updateNote);
// DELETE /api/clients/:clientId/notes/:noteId
router.delete('/:clientId/notes/:noteId', clientsCtrl.deleteNote);


module.exports = router;