const { GroupFiles }= require('./store.js');
const store= new GroupFiles();

module.exports= {
  getAllElements: async () => await store.getAll(),
  getOneElement: async ( id ) => {
    const value= await store.getOne( id );
    if( !value ) throw new Error(`Element with ID -> ${id} Doesn't exist`);
    return value;
  },
  addOneElement: async ( cont ) => {
    await store.addOne(cont);
  },
  editOneElement: async ( id, cont ) => {
    const exist= await store.editOne( id, cont );
    if( !exist ) throw new Error(`Element with ID -> ${id} Doesn't exist`);
  },
  delOneElement: async ( id ) => {
    const exist= await store.delOne( id );
    if( !exist )  throw new Error(`Element with ID -> ${id} Doesn't exist`);
  },
};