const getError= ( error ) => {
  let message= "";
  if( typeof error === 'object' && error !== null ){
    message+= error.hasOwnProperty('message') ? error.message : JSON.stringify( error );
  }else message+= String(error);
  return message;
};

const fetchSend= async( url="" , type="" , send )=>{
  let stat= false;
  let data= {};
  let mess= "";
  try {
    const config= { method: type || "GET" };
    config.headers= { 'X-Requested-With': 'XMLHttpRequest' };
    send && ( config.body= JSON.stringify(send) );
    send && ( config.headers= { ...config.headers, 'Content-Type': 'application/json' }  );

    const res= await fetch( url, config );
    const json= await res.json();
    if( !res.ok )  throw { status: res.status ,  message: `${ json.stack ? json.stack.split('\n')[0] : json.error }`  };

    data= json.data;
    mess= json.mess;
    stat= true;
  } catch (err) { 
    stat= false;
    mess= getError(err);
  };
  return { stat, data , mess };
};

const IP= `http://localhost:3001/api`

module.exports= { getError , fetchSend , IP };