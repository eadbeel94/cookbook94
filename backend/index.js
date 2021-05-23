const express= require('express');
const cors= require('cors');
const { join }= require('path');
const boom= require('@hapi/boom');

//--------------------------- Config options ---------------------------
const app= express();

if( process.env.NODE_ENV !== 'production' ) require('dotenv').config();
require('./model/connection.js');

const { DEBUG, HOT_REL , PORT }= require('./utils/config.js');

if( DEBUG ) console.log= require('debug')('app:log');
if( DEBUG ) console.error= require('debug')('app:error ->');

app.set('PORT' , PORT );

//--------------------------- Global middlewares ---------------------------
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

if( HOT_REL ){
  console.log('hot reload activated' )
  const { createServer } = require("livereload");
  const connectLivereload = require("connect-livereload");
  
  const liveReloadServer = createServer();
  liveReloadServer.watch( join(__dirname, './views') );
  liveReloadServer.watch( join(__dirname, '../public') );
  liveReloadServer.server.once("connection", () => setTimeout(() => liveReloadServer.refresh("/"), 100));
  
  app.use(connectLivereload());
}

//--------------------------- Routes ---------------------------
require('./routes/apiRoutes.js')(app);
//require('./routes/viewsRoutes.js')(app);
//app.get('/', ( req , res ) => res.redirect('/views/') );    //redirect

//--------------------------- Static files ---------------------------
app.use( express.static( join(__dirname, '../public') ) );

//--------------------------- Errors ---------------------------

app.use( function( req , res , next ) {
  if( !req.accepts('html') || req.xhr ){
    const {
      output: { statusCode, payload }
    } = boom.notFound(); 
    res.status( statusCode ).json( payload );
  }else
    res.status(404).render("404.hbs");
});

const { logError, wrapError , cliErrorHandler, errorHandler }= require('./utils/middlewares/errorHandler.js');
app.use( logError );
app.use( wrapError );
app.use( cliErrorHandler );
app.use( errorHandler );

//--------------------------- Initialize server ---------------------------
app.listen( app.get('PORT') , ()=> console.log(`Server on port ${ app.get('PORT') }`) );