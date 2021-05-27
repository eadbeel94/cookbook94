const { Router }= require('express');
const router= Router();

const valid= require('../../utils/middlewares/validHandler.js');

const { NOT_AUTH , TEST_ID }= require('../../utils/config.js');
const { checkLogged } = require('../../utils/middlewares/authHandler.js');
const { recipeIdSchema, recipeSchema }= require('../../utils/schema/validSchema.js');

const { 
  getAllElements,
  getOneElement,
  addOneElement,
  editOneElement,
  delOneElement
}= require('./index.js');

router.get('/getAll', checkLogged , async (req,res,next)=>{
  try {
    const { passport }= req.session;

    let userID= "";
    const data= { username: "UNKNOWN" };
    if( passport && passport.user ){
      data.username= String( passport.user.fullname ).toUpperCase();
      userID= passport.user.id;
    };
    if( NOT_AUTH ) userID= TEST_ID;

    const list= await getAllElements( userID );
    data.list= list;
    delete req.session.amessage;
    
    res.json({ data , mess: "Get all elements successfully" });
  } catch (error) {   next(error);    };
});

router.get('/getOne/:id' , checkLogged, valid( recipeIdSchema , "params" ) , async (req,res,next)=>{
  try {
    const { id: recipeID }= req.params;
    const { passport }= req.session;

    let userID= "";
    if( passport ) userID= passport.user.id;
    if( NOT_AUTH ) userID= TEST_ID;

    const data= await getOneElement( recipeID , userID );
    res.json({ data , mess: "Get one element successfully" });
  } catch (error) {   next(error);    };
});

router.post('/addOne' , checkLogged , valid( recipeSchema ) , async (req,res,next)=>{
  try {
    const { body: recipe , session }= req;

    let userID= "";
    if( session.passport )  userID= session.passport.user.id;
    if( NOT_AUTH )          userID= TEST_ID;

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

      let userID= "";
      if( session.passport )  userID= session.passport.user.id;
      if( NOT_AUTH )          userID= TEST_ID;

      await editOneElement( recipeID, recipe, userID );
      res.json({ data: true , mess: "Edit One elements successfully" });
    } catch (error) {   next(error);    };
  }
);

router.delete('/delOne/:id' , checkLogged, valid( recipeIdSchema , "params" ) , async (req,res,next)=>{
  try {
    const { id: recipeID }= req.params;
    const { passport }= req.session;

    let userID= "";
    if( passport )  userID= passport.user.id;
    if( NOT_AUTH )  userID= TEST_ID;

    await delOneElement( recipeID , userID );
    res.json({ data: true , mess: "Delete one element successfully" });
  } catch (error) {   next(error);    };
});

module.exports= router;