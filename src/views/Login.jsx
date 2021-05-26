import { useState } from 'react';
import { Link , useHistory } from "react-router-dom";

import '../css/Login.css';
import back1 from '../assets/images/back2.png';

import { ReactComponent as Icon1 } from '../assets/images/facebook.svg';
import { ReactComponent as Icon2 } from '../assets/images/linkedin.svg';
import { ReactComponent as Icon3 } from '../assets/images/twitter.svg';
import { ReactComponent as Icon4 } from '../assets/images/youtube.svg';
import { ReactComponent as Icon5 } from '../assets/images/person.svg';

import ModalMessage from '../components/ModalMessage.jsx';

import { useModal } from '../hooks/main.jsx';
import fetchSend from '../js/helper.js';

export default function Login() {

  const history = useHistory();
  const [ modalM , , , , setMessAThemeM , , initModalM ]= useModal({ req: false, mess: "" , theme: 0 , cb: ()=>{} });
  const [userInfo, setUserInfo] = useState({ username: "" , password: "" });

  const reqLogin= async (ev)=>{
    ev.preventDefault();
    const url= `/users/auth`;
    const { stat , mess }= await fetchSend( url , "POST" , userInfo );

    setMessAThemeM( mess , 2 );
    stat && setTimeout(() => history.push('/views/main'), 1000);
  };

  const handleChange= ({ target })=>{
    setUserInfo({ ...userInfo , [target.name]: target.value })
  };

  return (
    <>
      <div className="login magictime swap">
        <div className="has-text-white">
          <section className="login-left">
            <div>

              <div className="login-image">
                <img src={ back1 } alt="" />
              </div>

              <div className="has-text-centered mt-5">
                <h5>Welcome to </h5> 
                <h6>Cookbook 94</h6>
              </div>
              
              <div className="login-icons">

                <a className="button" href="https://www.facebook.com/"  target="tab" > <Icon1 /> </a>
                <a className="button" href="https://www.linkedin.com/"  target="tab" > <Icon2 /> </a>
                <a className="button" href="https://twitter.com/"       target="tab" > <Icon3 /> </a>
                <a className="button" href="https://www.youtube.com/"   target="tab" > <Icon4 /> </a>
                
              </div>

            </div>
          </section>
          <section className="login-right has-text-centered">

            <form onSubmit= { reqLogin } >

              <section></section>

              <section>
                <div className="my-4">
                  <Icon5 /> 
                </div>

                <div className="field">
                  <div className="control">
                    <input className="input is-rounded" type="text" placeholder="Username" name="username" value= { userInfo.username } onChange= { handleChange } autoComplete="off" />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <input className="input is-rounded" type="password" placeholder="Password" name="password" value= { userInfo.password } onChange= { handleChange } />
                  </div>
                </div>
              </section>

              <section>
                <button type="submit" className="button is-fullwidth is-rounded btn-login my-2">
                  Login
                </button>
                <Link to="/views/register">
                  <button type="button" className="button is-fullwidth is-rounded btn-register">
                    Register user
                  </button>
                </Link>
              </section>

            </form>
          
          </section>
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