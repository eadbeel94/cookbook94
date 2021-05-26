const bcrypt = require('bcrypt');
const m= require('dayjs');
const { GroupFiles }= require('./store.js');
const store= new GroupFiles();

module.exports= {
  addOneElement: async ( cont ) => {
    const { fullname, username: user, password: pass, confirm } = cont;
    if( pass.length >= 3 && confirm.length >= 3 && pass == confirm ){
      const username= user.toUpperCase();
      const salt = await bcrypt.genSalt(10);  
      const password = await bcrypt.hash(pass, salt);
      const date = m().format();
      await store.addOne({ fullname, username, password, date });
    }else
      throw new Error(`Password doesn't match`);
  },
};