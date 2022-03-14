// Imports
const express = require('express');
const notesController = require('../controllers/notesController');

// Create router
const router = express.Router();

// Routes
router.route('/api/notes').post(notesController.enterNote);
router.route('/api/notes/all').get(notesController.getNotesByUserToken);
router.route('/api/notes/recent').get(notesController.getRecentNotes);
router.route('/api/notes/important').get(notesController.getImportantNotes);
router.route('/api/notes/date').post(notesController.getNotesOnDate);
router.route('/api/notes/note/update').post(notesController.updateNote);
router.route('/api/notes/note/delete').post(notesController.deleteNote);

module.exports = router;