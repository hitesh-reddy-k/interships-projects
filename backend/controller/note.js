const Note = require("../model/notemodel");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = new Note({
      title,
      content,
      userId: req.user.id
    });

    await note.save();
    res.status(201).json({ message: "Note created", note });
  } catch (err) {
    console.error("Create Note Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error("Get Notes Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error("Get Note Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note updated", note });
  } catch (err) {
    console.error("Update Note Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Delete Note Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
