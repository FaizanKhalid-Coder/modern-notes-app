const Note = require('../models/Note');

// @route POST /api/notes
const createNote = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    const note = await Note.create({
      title,
      content,
      category,
      tags,
      user: req.user.id
    });

    res.status(201).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
      isDeleted: false
    })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      notes
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/notes/:id
const getSingleNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
      isDeleted: false
    }).populate('user', 'username email');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id, isDeleted: false },
      { title, content, category, tags },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DELETE /api/notes/:id (soft delete)
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isDeleted: true },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/notes/:id/archive
const archiveNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
      isDeleted: false
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.isArchived = !note.isArchived;
    await note.save();

    res.status(200).json({
      success: true,
      message: note.isArchived ? 'Note archived' : 'Note unarchived',
      note
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/notes/search?q=keyword&category=general&tags=test
const searchNotes = async (req, res) => {
  try {
    const { q, category, tags } = req.query;

    let query = {
      user: req.user.id,
      isDeleted: false
    };

    if (q) {
      query.$text = { $search: q };
    }

    if (category) {
      query.category = category;
    }

    if (tags) {
      query.tags = { $in: tags.split(',') };
    }

    // Only use textScore sort when q is provided
    const sortOption = q
      ? { score: { $meta: 'textScore' } }
      : { createdAt: -1 };

    const notes = await Note.find(query)
      .populate('user', 'username email')
      .sort(sortOption);

    res.status(200).json({
      success: true,
      count: notes.length,
      notes
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  archiveNote,
  searchNotes
};