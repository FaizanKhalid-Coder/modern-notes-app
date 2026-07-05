const express = require('express');
const router = express.Router();
const {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  archiveNote,
  searchNotes
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

// Search must be BEFORE /:id routes
router.get('/search', searchNotes);

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getSingleNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.put('/:id/archive', archiveNote);

module.exports = router;