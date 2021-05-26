const boom= require('@hapi/boom');
const { DEV } = require("../../utils/config.js");

function isreqAjaxorApi(req) {
  return !req.accepts('html') || req.xhr;
};

function withErrorStack( err, stack ) {
  if( DEV ) return { ...err , stack }
};

function logError(err, req, res, next) {
  //console.error(`[handlerError] ${ err.message || err }`);
  let error= "";
  if( err.stack ) error= err.stack;
  //if( err.stack )         error= err.stack.split('\n')[0];
  else if ( err.message ) error= err.message;
  else                    error= String(err);

  console.error(`[handlerError] ${ error }`);
  next(err);
};

function wrapError( err, req, res, next ) {
  if(!err.isBoom) next( boom.badImplementation(err) )
  next(err);
};

function cliErrorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err; 
  
  if( isreqAjaxorApi(req) || res.headersSent ){
    res.status(statusCode).json( withErrorStack( payload , err.stack ) );
  }else{
    next(err);
  };
};

function errorHandler(err, req, res, next) {
  if( !isreqAjaxorApi(req) ){
    const {
      output: { statusCode, payload }
    } = err; 
  
    res.status( statusCode );
    res.redirect("/404");
  };
};

module.exports= {
  logError,
  wrapError,
  cliErrorHandler,
  errorHandler
};