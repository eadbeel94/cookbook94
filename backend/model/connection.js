const { connect }= require('mongoose');

const { DB_URI }= require('../utils/config.js');

connect( DB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then( db => db && console.log('DB connected') )
.catch( err => console.log( err.message || String(err) ) );