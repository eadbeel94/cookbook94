const { Router }= require('express');
const { authHandler } = require('../../utils/middlewares/authHandler.js');

const router= Router();

const { 
  addOneElement,
}= require('./index.js');

const valid= require('../../utils/middlewares/validHandler.js');

const { userNewSchema }= require('../../utils/schema/validSchema.js');

router.post('/addOne' , valid( userNewSchema ) , async (req,res,next)=>{
  try {
    const { body: user }= req;
    await addOneElement( user );
    res.json({ data: true , mess: "Add one element successfully" });
  } catch (error) {   next(error);    };
});

router.post("/auth" , authHandler , async (req, res, next) => {
  try {
    const { amessage }= req.session;
    
    res.json({ data: true , mess: amessage });
  } catch (error) {   next(error)   };
});

router.get("/logout" , async (req, res, next) => {
  try {
    req.logout();    
    res.json({ data: true , mess: "Session closed successfully" });
  } catch (error) {   next(error)   };
});

module.exports= router;