const { Schema, model } = require('mongoose'); 

const recipeSchema = new Schema({                           //Creo una tabla de nombre UserSchema
  title:  { type: String , required: true },
  list:   { type: Array  },
  inst:   { type: String },
  from:   { type: String },
  desc:   { type: String },
  image:  { type: String },
  datec:  { type: String },
  datem:  { type: String }
});

module.exports.Recipe = model('recipes', recipeSchema);