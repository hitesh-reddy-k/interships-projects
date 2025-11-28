const Joi = require("joi");

exports.noteSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  content: Joi.string().min(5).required()
});
