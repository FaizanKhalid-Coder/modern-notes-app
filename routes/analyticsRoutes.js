const express = require('express');
const router = express.Router();
const {
  notesByCategory,
  notesByMonth,
  summary
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/notes-by-category', notesByCategory);
router.get('/notes-by-month', notesByMonth);
router.get('/summary', summary);

module.exports = router;