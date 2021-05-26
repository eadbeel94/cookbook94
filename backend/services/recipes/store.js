const { Recipe }= require('../../model/main.js');

class GroupFiles{
  constructor(){

  };

  async getAll( userID ){
    try {
      return await Recipe.find({ userID }).select('title list from datem image');
    } catch (error) { throw error };
  };

  async getOne( elementID , userID ){
    try {
      return await Recipe.findOne({ _id: elementID, userID });
    } catch (error) { throw error };
  };

  async addOne(group){
    try {
      const newRecipe= new Recipe(group);
      await newRecipe.save();
    } catch (error) { throw error };
  };

  async editOne( elementID , group ){
    try {
      return await Recipe.findByIdAndUpdate( elementID , group );
    } catch (error) { throw error };
  };

  async delOne( elementID ){
    try {
      return await Recipe.findByIdAndRemove( elementID );
    } catch (error) { throw error };
  };

  async validOne ( elementID , userID ){
    try {
      return await Recipe.findOne({ _id: elementID, userID }).select('_id');
    } catch (error) { throw error };
  }
};

module.exports= { GroupFiles }