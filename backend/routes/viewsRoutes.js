const { Router }= require('express');
const router= Router();

router.get('/', (req,res,next)=>{
  try { 
    res.redirect('/')
  } catch (error) {   next(error);    };
});

function viewsLink( server ){
  server.use( '/views' , router );
};

module.exports= viewsLink;