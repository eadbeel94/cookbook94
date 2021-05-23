function validHandler( schema, check= "body" ) {
  return function (req, res, next) {
    const { error }= schema.validate(req[check])
    error ? next(new Error(error)) : next();
  };
};

module.exports= validHandler;