const Joi= require('joi');

const noteIdSchema= Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
});

const createNoteSchema= Joi.object({
  fileName: Joi.string().min(3).max(50).required(),
  common:   Joi.string().min(3).max(50).required(),
  mimeType: Joi.string().min(3).max(50).required(),
  fileType: Joi.string().min(3).max(50).required(),
  fileExt:  Joi.string().min(3).max(50).required(),
  dirPath:  Joi.string().min(2).required(),
  filePath: Joi.string().max(50).required(),
  image:    Joi.string().required()
});

const updateNoteSchema= Joi.object({
  fileName: Joi.string().min(3).max(50),
  common:   Joi.string().min(3).max(50),
  mimeType: Joi.string().min(3).max(50),
  fileType: Joi.string().min(3).max(50),
  fileExt:  Joi.string().min(3).max(50),
  dirPath:  Joi.string().min(2),
  filePath: Joi.string().max(50),
  image:    Joi.string()
});

module.exports= {
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema
};