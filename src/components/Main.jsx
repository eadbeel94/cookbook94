import { useState , useEffect } from 'react'

import ModalMessage from './ModalMessage.jsx';
import ModalAdd from './ModalAdd.jsx';

import { useModal } from '../hooks/main.jsx';

export default function Main(props) {
  const {  }= props;

  const [ modalM , , , , setMessAThemeM , , initModalM ]= useModal({ req: false, mess: "" , theme: 0 , cb: ()=>{} });
  const [showModalAdd, setShowModalAdd] = useState(false);

  const createRecipe= (send)=>{
    console.log(15,send);
  };

  return (
    <>
      <div id="lbl_Empty" className="flex-center">
        <div className="has-text-centered has-text-primary">
          <h5 className="is-size-2">You have no recipes</h5>
          <p style={{ fontSize: "100px" }}>😔</p>
        </div>
      </div>

      <div id="btn_add" style={{ position: "fixed", top: "0px" , width: "100%" , height: "100%" , zIndex: "5" }}>
        <div style={{ position: "fixed" , bottom: "20px" , right: "20px" }}>
          <button
            onClick= { ()=> setShowModalAdd( true ) }
            className="button is-rounded is-primary" style={{ fontSize: "50px" }}
          > 
            ➕ 
          </button>
        </div>
      </div>  

      <ModalAdd show= { showModalAdd } actCreate= { createRecipe } actClose= { ()=> setShowModalAdd(false) } />

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