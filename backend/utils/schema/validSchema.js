const Joi= require('joi');

const recipeIdSchema= Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
});

const recipeSchema= Joi.object({
  title: Joi.string().min(3).max(100).required(),
  list:  Joi.array().items(Joi.string()),
  inst:  Joi.string().min(3),
  from:  Joi.string().min(3).max(100),
  desc:  Joi.string().min(3).max(200),
  image: Joi.string().min(3).max(100),
  datec: Joi.string().min(3).max(100),
  datem: Joi.string().min(3).max(100),
});

const userNewSchema= Joi.object({
  fullname: Joi.string(),
  username: Joi.string(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  confirm:  Joi.ref('password'),
  email:    Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
}).with('password', 'confirm');

module.exports= {
  recipeIdSchema,
  recipeSchema,
  userNewSchema
};