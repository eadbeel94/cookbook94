//import React from 'react'
import { Link , useLocation } from "react-router-dom";

import '../css/Navbar.css';

import { ReactComponent as Icon1 } from '../assets/images/door-open.svg';
import { ReactComponent as Icon2 } from '../assets/images/file-text.svg';
import { ReactComponent as Icon3 } from '../assets/images/house-door.svg';
import { ReactComponent as Icon4 } from '../assets/images/box-arrow-in-right.svg';    

export default function Navbar(props) {
  const { actLogout }= props;
  const { pathname }= useLocation();

  const showLastBtn= ( path )=> path.indexOf('/views/recipe') > -1 || path.indexOf('/views/main') > -1;
  
  return (
    <nav id="navbar">
      {
        !showLastBtn(pathname) && <Link to="/" ><button className="button is-primary is-outlined"> <Icon4/> <p>LOGIN</p> </button></Link>
      }
      {
        showLastBtn(pathname) && <Link to="/views/main" ><button className="button is-primary is-outlined"> <Icon3/> <p>HOME</p> </button></Link>
      }
        <Link to="/views/about" ><button className="button is-primary is-outlined"> <Icon2/> <p>ABOUT</p> </button></Link>
      {
        showLastBtn(pathname) && <button className="button is-primary is-outlined" onClick={ actLogout } > <Icon1/> <p>LOGOUT</p> </button>
      }
    </nav>
  );
};