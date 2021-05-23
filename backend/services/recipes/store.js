const { File }= require('../../model/main.js');

class GroupFiles{
  constructor(){

  };

  async getAll(){
    try {
      return await File.find();
    } catch (error) { throw error };
  };

  async getOne( id ){
    try {
      return await File.findById( id );
    } catch (error) { throw error };
  };

  async addOne(group){
    try {
      const newNote= new File(group);
      await newNote.save();
    } catch (error) { throw error };
  };

  async editOne( id , group ){
    try {
      return await File.findByIdAndUpdate( id , group );
    } catch (error) { throw error };
  };

  async delOne( id ){
    try {
      return await File.findByIdAndRemove( id );
    } catch (error) { throw error };
  };
};

module.exports= { GroupFiles }