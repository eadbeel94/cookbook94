const fetchSend= async( url="" , type="" , send )=>{

  const getError= ( error ) => {
    let message= "";
    if( typeof error === 'object' && error !== null ){
      message+= error.hasOwnProperty('message') ? error.message : JSON.stringify( error );
    }else message+= String(error);
    message= message.replace('Error: ','');
    return message;
  };

  const IP= process.env.NODE_ENV !== 'production' ? `http://localhost:3001/api` : `/api`

  let stat= false;
  let noauth;
  let data= {};
  let mess= "";
  try {
    const config= { method: type || "GET" };
    config.headers= { 'X-Requested-With': 'XMLHttpRequest' };
    //config.withCredentials= true;
    send && ( config.body= JSON.stringify(send) );
    send && ( config.headers= { ...config.headers, 'Content-Type': 'application/json' }  );

    const res= await fetch( `${IP}${url}`, config );
    const json= await res.json();

    if( res.status === 511 ){ 
      noauth= true;
      throw { status: res.status ,  message: `${ json.stack ? json.stack.split('\n')[0] : json.error }`  } 
    };

    if( !res.ok ) throw { status: res.status ,  message: `${ json.stack ? json.stack.split('\n')[0] : json.error }`  };

    data= json.data;
    mess= json.mess;
    stat= true;
  } catch (err) { 
    stat= false;
    mess= getError(err);
  };
  return { stat , data , mess , noauth };
};

export default fetchSend;