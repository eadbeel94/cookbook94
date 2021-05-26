const { GroupFiles }= require('./store.js');
const store= new GroupFiles();

const m= require('dayjs');
m.extend(require('dayjs/plugin/localizedFormat'));
m.extend(require('dayjs/plugin/relativeTime'));

module.exports= {
  getAllElements: async ( userID ) => {
    const elements= await store.getAll( userID );
    return elements.map( el => {
      return {
        title: el.title,
        qty: el.list.length,
        from: el.from,
        image: el.image,
        datem: m.unix(el.datem).fromNow(),
        id: el._id,
      }
    });
  },
  getOneElement: async ( recipeID , userID ) => {
    const value= await store.getOne( recipeID , userID );
    if( !value ) throw new Error(`Element with ID -> ${recipeID} Doesn't exist`);
    return {
      title:  value.title,
      list:   value.list,
      inst:   value.inst,
      from:   value.from,
      desc:   value.desc,
      image:  value.image,
      datec:  m.unix(value.datec).format('lll'),
      datem:  m.unix(value.datem).format('lll')
    };
  },
  addOneElement: async ( cont , userID ) => {
    const date=  m().unix();
    const data= { 
      ...cont , 
      datem: date,
      datec: date,
      userID
    };
    await store.addOne( data );
  },
  editOneElement: async ( recipeID, cont , userID ) => {
    const valid= await store.validOne( recipeID , userID );
    if( !valid || !valid._id || 10 > valid._id.length ) throw new Error(`Actual user not has this element id -> ${ recipeID } `);

    const data= { 
      ...cont,
      datem: m().unix()
    };
    const exist= await store.editOne( recipeID, data );
    if( !exist ) throw new Error(`Element with ID -> ${recipeID} Doesn't exist`);
  },
  delOneElement: async ( recipeID , userID  ) => {
    const valid= await store.validOne( recipeID , userID );
    if( !valid || !valid._id || 10 > valid._id.length ) throw new Error(`Actual user not has this element id -> ${ recipeID } `);

    const exist= await store.delOne( recipeID );
    if( !exist )  throw new Error(`Element with ID -> ${recipeID} Doesn't exist`);
  },
};