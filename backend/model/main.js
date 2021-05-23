const { Schema, model } = require('mongoose'); 

const fileSchema = new Schema({                           //Creo una tabla de nombre UserSchema
  title:  { type: String , required: true },
  list:   { type: Array  },
  inst:   { type: String },
  from:   { type: String },
  desc:   { type: String },
  image:  { type: String },
});

module.exports.File = model('files', fileSchema);