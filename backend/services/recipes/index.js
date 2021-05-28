/** @namespace service/recipe */

const { GroupRecipe }= require('./store.js');

/**
 * Call methods to modify values into collection recipe
 * @const {class} store
 * @memberof service/recipe
 */
const store= new GroupRecipe();

const m= require('dayjs');
m.extend(require('dayjs/plugin/localizedFormat'));
m.extend(require('dayjs/plugin/relativeTime'));

module.exports= {

  /**
   * Return all recipes whit same user id
   * @function getAllElements
   * @memberof service/recipe
   * @param {string} userID user identificator
   * @returns {array<object>} All recipes in an object's array
   */
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
  /**
   * Return a recipe using a specific user and recipe id
   * @function getOneElement
   * @memberof service/recipe
   * @param {string} recipeID recipe identificator
   * @param {string} userID user identificator
   * @returns {object} Return all fields from recipe
   */
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
  /**
   * Add a new recipe into database
   * @function addOneElement
   * @memberof service/recipe
   * @param {object} cont include all recipe fields
   * @param {string} userID user identificator
   */
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
  /**
   * Edit a specific recipe
   * @function editOneElement
   * @memberof service/recipe
   * @param {string} recipeID recipe identificator
   * @param {object} cont include all recipe fields
   * @param {string} userID user identificator
   */
  editOneElement: async ( recipeID, cont , userID ) => {
    const valid= await store.validOne( recipeID , userID );
    if( !valid || !valid._id || 10 > valid._id.length ) throw new Error(`Actual user not has this element id -> ${ recipeID } `);

    const data= { ...cont,  datem: m().unix()  };
    const exist= await store.editOne( recipeID, data );
    if( !exist ) throw new Error(`Element with ID -> ${recipeID} Doesn't exist`);
  },
  /**
   * Erase a specific recipe
   * @function delOneElement
   * @memberof service/recipe
   * @param {string} recipeID recipe identificator
   * @param {string} userID user identificator
   */
  delOneElement: async ( recipeID , userID  ) => {
    const valid= await store.validOne( recipeID , userID );
    if( !valid || !valid._id || 10 > valid._id.length ) throw new Error(`Actual user not has this element id -> ${ recipeID } `);

    const exist= await store.delOne( recipeID );
    if( !exist )  throw new Error(`Element with ID -> ${recipeID} Doesn't exist`);
  },
};