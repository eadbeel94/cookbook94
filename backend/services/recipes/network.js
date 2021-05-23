const { Router }= require('express');

const router= Router();

const { 
  getAllElements,
  getOneElement,
  addOneElement,
  editOneElement,
  delOneElement
}= require('./index.js');

//const valid= require('../../utils/middlewares/validHandler.js');

const { 
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema
}= require('../../utils/schema/validNotes.js');

router.get('/getAll', async (req,res,next)=>{
  try {
    const data= await getAllElements();
    /*
    const error = require('@hapi/boom').badRequest('Simulate error');
    error.output.statusCode = 500;
    error.reformat();
    error.output.payload.custom = 'Simulate error';
    throw error;
    */
    res.json({ data , mess: "Get all elements successfully" });
  } catch (error) {   next(error);    };
});

router.get('/getOne/:id' /*, valid( noteIdSchema , "params" ) */ , async (req,res,next)=>{
  try {
    const { id }= req.params;
    const data= await getOneElement(id);
    res.json({ data , mess: "Get one element successfully" });
  } catch (error) {   next(error);    };
});

router.post('/addOne' /*, valid( createNoteSchema )*/ , async (req,res,next)=>{
  try {
    const { body: note }= req;
    await addOneElement(note);
    res.json({ data: true , mess: "Add one element successfully" });
  } catch (error) {   next(error);    };
});

router.put('/editOne/:id', /*
  valid( noteIdSchema , "params" ),
  valid( updateNoteSchema ),*/
  async (req,res,next)=>{
    try {
      const { id }= req.params;
      const { body: note }= req;
      await editOneElement( id, note);
      res.json({ data: true , mess: "Edit One elements successfully" });
    } catch (error) {   next(error);    };
  }
);

router.delete('/delOne/:id' /*, valid( noteIdSchema , "params" ) */, async (req,res,next)=>{
  try {
    const { id }= req.params;
    await delOneElement( id );
    res.json({ data: true , mess: "Delete one element successfully" });
  } catch (error) {   next(error);    };
});

module.exports= router;