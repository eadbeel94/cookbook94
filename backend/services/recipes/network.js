const { Router }= require('express');
const router= Router();

const { checkLogged } = require('../../utils/middlewares/authHandler.js');
//const { AUTH_ENABLE }= require('../../utils/config.js');

const { 
  getAllElements,
  getOneElement,
  addOneElement,
  editOneElement,
  delOneElement
}= require('./index.js');

const valid= require('../../utils/middlewares/validHandler.js');

const { recipeIdSchema, recipeSchema }= require('../../utils/schema/validSchema.js');

router.get('/getAll', checkLogged , async (req,res,next)=>{
  try {
    const { passport }= req.session;
    const data= { username:  String( passport.user.fullname || 'UNKNOWN' ).toUpperCase()  };

    const userID= passport.user.id;
    const list= await getAllElements( userID );
    data.list= list;
    
    res.json({ data , mess: "Get all elements successfully" });
  } catch (error) {   next(error);    };
});

router.get('/getOne/:id' , checkLogged, valid( recipeIdSchema , "params" ) , async (req,res,next)=>{
  try {
    const { id: recipeID }= req.params;
    const { session }= req;

    const userID= session.passport.user.id;

    const data= await getOneElement( recipeID , userID );
    res.json({ data , mess: "Get one element successfully" });
  } catch (error) {   next(error);    };
});

router.post('/addOne' , checkLogged , valid( recipeSchema ) , async (req,res,next)=>{
  try {
    const { body: recipe , session }= req;

    const userID= session.passport.user.id;
    await addOneElement( recipe , userID );

    const data= await getAllElements(userID);
    res.json({ data , mess: "Add one element successfully" });
  } catch (error) {   next(error);    };
});

router.put('/editOne/:id', 
  checkLogged,
  valid( recipeIdSchema , "params" ),
  valid( recipeSchema ),
  async (req,res,next)=>{
    try {
      const { id: recipeID }= req.params;
      const { body: recipe , session }= req;

      const userID= session.passport.user.id;
      await editOneElement( recipeID, recipe, userID );
      res.json({ data: true , mess: "Edit One elements successfully" });
    } catch (error) {   next(error);    };
  }
);

router.delete('/delOne/:id' , checkLogged, valid( recipeIdSchema , "params" ) , async (req,res,next)=>{
  try {
    const { id: recipeID }= req.params;
    const { passport }= req.session;

    const userID= passport.user.id;
    await delOneElement( recipeID , userID );
    res.json({ data: true , mess: "Delete one element successfully" });
  } catch (error) {   next(error);    };
});

module.exports= router;