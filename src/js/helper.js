/** @namespace view/helper */

/**
 * Send information to server using fetch fcn 
 * @function fetchSend
 * @param {string} url endopoint server where send query
 * @param {string} type "GET", "POST" , "PUT" OR "DELETE"
 * @param {object} send group information send to server
 * @memberof view/helper
 * @returns {{ stat: boolean, data: any, message: string, noauth: boolean }} give status, data, a messsage and status auth
 */
const fetchSend= async( url="" , type="" , send )=>{

  /**
   * Process object error in a message
   * @function getError
   * @param {error} error object type error
   * @memberof front/helper
   * @returns {string} error in message string
   */
  const getError= ( error ) => {
    let message= "";
    if( typeof error === 'object' && error !== null ){
      message+= error.hasOwnProperty('message') ? error.message : JSON.stringify( error );
    }else message+= String(error);
    message= message.replace('Error: ','');
    return message;
  };

  /** 
   * URL endpoint
   * @const {string} IP
   * @memberof front/helper
   */
  const IP= process.env.NODE_ENV !== 'production' ? `http://localhost:3001/api` : `/api`

  /** 
   * End state after process endopoint response
   * @type {boolean}
   * @memberof front/helper
   */
  let stat= false;
  /** 
   * If user not logged succesfully, this value will be false
   * @type {boolean}
   * @memberof front/helper
   */
  let noauth;
  /** 
   * Group information got from server
   * @type {object}
   * @memberof front/helper
   */
  let data= {};
  /** 
   * status detail message
   * @type {string}
   * @memberof front/helper
   */
  let mess= "";
  try {
    /** 
     * fetch configuration object
     * @const {string} config
     * @memberof front/helper
     */
    const config= { method: type || "GET" };
    config.headers= { 'X-Requested-With': 'XMLHttpRequest' };
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