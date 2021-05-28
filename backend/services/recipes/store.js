const { Recipe }= require('../../model/main.js');

/** 
 * CRUD operation to change values into recipe collection
 * @memberof service/recipe
 **/
class GroupRecipe{
  /** constructor not used */
  constructor(){

  };
  /**
   * Get all recipes using a same userID
   * @param {string} userID 
   * @returns {array<object>} All recipes
   */ 
  async getAll( userID ){
    try {
      return await Recipe.find({ userID }).select('title list from datem image');
    } catch (error) { throw error };
  };
  /**
   * Get a recipe using a recipe ID
   * @param {string} elementID 
   * @param {string} userID 
   * @returns {object} if exist get recipe
   */
  async getOne( elementID , userID ){
    try {
      return await Recipe.findOne({ _id: elementID, userID });
    } catch (error) { throw error };
  };
  /**
   * Save new recipe
   * @param {object} group object with all recipe's fields
   */
  async addOne(group){
    try {
      const newRecipe= new Recipe(group);
      await newRecipe.save();
    } catch (error) { throw error };
  };
  /**
   * Edit a recipe using recipe ID
   * @param {string} elementID 
   * @param {object} group 
   * @returns {object} Recipe edited
   */
  async editOne( elementID , group ){
    try {
      return await Recipe.findByIdAndUpdate( elementID , group );
    } catch (error) { throw error };
  };
  /**
   * Delete a recipe using recipe ID
   * @param {string} elementID 
   * @returns {object} Recipe deleted
   */
  async delOne( elementID ){
    try {
      return await Recipe.findByIdAndRemove( elementID );
    } catch (error) { throw error };
  };
  /**
   * Check if recipe is own user ID
   * @param {string} elementID 
   * @param {string} userID 
   * @returns {object} recipeID
   */
  async validOne ( elementID , userID ){
    try {
      return await Recipe.findOne({ _id: elementID, userID }).select('_id');
    } catch (error) { throw error };
  };
};

module.exports= { GroupRecipe };