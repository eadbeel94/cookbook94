import { useState } from 'react';
import { Link , useHistory } from "react-router-dom";

import '../css/Register.css';

import ModalMessage from '../components/ModalMessage.jsx';

import { useModal } from '../hooks/main.jsx';
import fetchSend from '../js/helper.js';

const initUserInfo= { fullname: "" , username: "" , password: "" , confirm: "" , email: "" };
export default function Login() {

  const history= useHistory();
  const [userInfo, setUserInfo] = useState(initUserInfo);
  const [ modalM , , , , setMessAThemeM , , initModalM ]= useModal({ req: false, mess: "" , theme: 0 , cb: ()=>{} });

  const createUser= async (ev) =>{
    ev.preventDefault();
    const url= `/users/addOne`;
    const { stat , mess }= await fetchSend( url , "POST" , userInfo );

    !stat && setMessAThemeM( mess , 2 );
    if( stat ){
      setMessAThemeM( 'You user has been registered successfully, now you can login in fisrt page' , 2 );
      setUserInfo(initUserInfo);
      setTimeout(() => history.push('/'), 2000);
    }
  };

  const handleChange= ({ target })=>{
    setUserInfo({ ...userInfo , [target.name]: target.value })
  };

  return (
    <>
      <div id="Register" className="magictime vanishIn">
        <div className="py-4">

          <form onSubmit= { createUser }>

            <h5 className="has-text-white has-text-centered my-1 is-size-2">REGISTER NOW</h5>

            <div className="field mt-2">
              <div className="control">
                <input className="input is-rounded" type="text" placeholder="John Dust" name="fullname" value= { userInfo.fullname } onChange= { handleChange } autoComplete="off" />
              </div>
              <label className="label has-text-white p-2">Full name</label>
            </div>

            <div className="field">
              <div className="control">
                <input className="input is-rounded" type="email" placeholder="john.dust.99@enterprise.com" name="email" value= { userInfo.email } onChange= { handleChange } autoComplete="off" />
              </div>
              <label className="label has-text-white p-2">E-mail</label>
            </div>

            <div className="field">
              <div className="control">
                <input className="input is-rounded" type="text" placeholder="swag95$1" name="username" value= { userInfo.username } onChange= { handleChange } autoComplete="off" />
              </div>
              <label className="label has-text-white p-2">Username</label>
            </div>

            <div className="field">
              <div className="control">
                <input className="input is-rounded" type="password" placeholder="secret" name="password" value= { userInfo.password } onChange= { handleChange } />
              </div>
              <label className="label has-text-white p-2">Password</label>
            </div>

            <div className="field">
              <div className="control">
                <input className="input is-rounded" type="password" placeholder="confirm" name="confirm" value= { userInfo.confirm } onChange= { handleChange } />
              </div>
              <label className="label has-text-white p-2">Confirm Password</label>
            </div>

            <div className="my-1 mb-3 has-text-centered">
              <button type="submit" className="button is-rounded mr-2">
                Save user
              </button>
              <Link to="/">
                <button type="button" className="button is-rounded ml-2">
                  Return
                </button>
              </Link>

            </div>

          </form>

        </div>
      </div>

      <ModalMessage
        show= { modalM.req }
        theme= { modalM.theme } 
        actConfirm= { modalM.cb } 
        actClose= { initModalM }
      > 
        { modalM.mess }
      </ModalMessage>
    </>
  );
};