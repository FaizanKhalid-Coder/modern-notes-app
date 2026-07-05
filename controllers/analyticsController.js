const Note = require('../models/Note');

// @route GET /api/analytics/notes-by-category
const notesByCategory = async (req, res) => {
  try {
    const data = await Note.aggregate([
      { $match: { user: req.user._id, isDeleted: false } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/analytics/notes-by-month
const notesByMonth = async (req, res) => {
  try {
    const data = await Note.aggregate([
      { $match: { user: req.user._id, isDeleted: false } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          count: 1
        }
      },
      { $sort: { year: -1, month: -1 } }
    ]);

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/analytics/summary
const summary = async (req, res) => {
  try {
    const totalNotes = await Note.countDocuments({
      user: req.user._id,
      isDeleted: false
    });

    const archivedNotes = await Note.countDocuments({
      user: req.user._id,
      isDeleted: false,
      isArchived: true
    });

    const deletedNotes = await Note.countDocuments({
      user: req.user._id,
      isDeleted: true
    });

    const categoriesData = await Note.aggregate([
      { $match: { user: req.user._id, isDeleted: false } },
      { $group: { _id: '$category' } },
      { $count: 'totalCategories' }
    ]);

    res.status(200).json({
      success: true,
      summary: {
        totalNotes,
        archivedNotes,
        deletedNotes,
        totalCategories: categoriesData[0]?.totalCategories || 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { notesByCategory, notesByMonth, summary };