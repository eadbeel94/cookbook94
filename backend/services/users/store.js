const { User }= require('../../model/main.js');

class GroupFiles{
  constructor(){

  };

  async addOne(group){
    try {
      const newUser= new User(group);
      await newUser.save();
    } catch (error) {   throw error   };
  };

};

module.exports= { GroupFiles };