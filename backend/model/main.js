/** @namespace model/schemas */

const { Schema, model } = require('mongoose'); 

/** 
 * Mongodb schema with all recipe params
 * @const {schema} recipeSchema
 * @memberof model/schemas
 */
const recipeSchema = new Schema({                           //Creo una tabla de nombre UserSchema
  title:  { type: String , required: true },
  list:   { type: Array  },
  inst:   { type: String },
  from:   { type: String },
  desc:   { type: String },
  image:  { type: String },
  datec:  { type: String },
  datem:  { type: String },
  userID: { type: String , required: true }
});

/** 
 * Mongodb schema with all user params 
 * @const {schema} userSchema
 * @memberof model/schemas
 */
const userSchema = new Schema({
  username: { type: String, required: true , unique: true },
  fullname: { type: String },
  email:    { type: String },
  password: { type: String, required: true },
  date:  { type: String }
})

module.exports.Recipe = model('recipes', recipeSchema);
module.exports.User = model('users', userSchema);