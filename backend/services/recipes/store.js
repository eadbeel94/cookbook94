const { Recipe }= require('../../model/main.js');

class GroupFiles{
  constructor(){

  };

  async getAll(){
    try {
      return await Recipe.find();
    } catch (error) { throw error };
  };

  async getOne( id ){
    try {
      return await Recipe.findById( id );
    } catch (error) { throw error };
  };

  async addOne(group){
    try {
      const newRecipe= new Recipe(group);
      await newRecipe.save();
    } catch (error) { throw error };
  };

  async editOne( id , group ){
    try {
      return await Recipe.findByIdAndUpdate( id , group );
    } catch (error) { throw error };
  };

  async delOne( id ){
    try {
      return await Recipe.findByIdAndRemove( id );
    } catch (error) { throw error };
  };
};

module.exports= { GroupFiles }