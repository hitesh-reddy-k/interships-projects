const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const validate = require("../middleware/validate");
const { noteSchema } = require("../utilies/validatorschema"); 
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} = require("../controller/note");

router.post("/notes", auth, validate(noteSchema), createNote);       
router.get("/notes", auth, getNotes);                                 
router.get("/notes/:id", auth, getNoteById);                         
router.put("/notes/:id", auth, validate(noteSchema), updateNote);     
router.delete("/notes/:id", auth, deleteNote);                        

module.exports = router;
