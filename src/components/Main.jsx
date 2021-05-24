import { useState , useEffect } from 'react'

import ModalMessage from './ModalMessage.jsx';
import ModalAdd from './ModalAdd.jsx';
import OneCard from './OneCard.jsx';
import Empty from './Empty.jsx';

import { useModal } from '../hooks/main.jsx';
import { fetchSend , IP } from '../js/helper.js';

export default function Main(props) {
  const {  }= props;

  const [ modalM , , , , setMessAThemeM , , initModalM ]= useModal({ req: false, mess: "" , theme: 0 , cb: ()=>{} });
  const [ showModalAdd, setShowModalAdd ] = useState(false);
  const [ recipes, setRecipes ] = useState([])

  const getAllRecipes= async() => {
    const url= `${IP}/recipes/getAll`
    const { stat , data , mess }= await fetchSend( url );
    console.log( data )
    setRecipes(data);
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  const createRecipe= async (send)=>{
    const url= `${IP}/recipes/addOne`
    const { stat , data , mess }= await fetchSend( url , "POST" , send );
    setMessAThemeM( mess , 2 );
    stat && setRecipes(data);
  };

  return (
    <>
      {
        0 >= recipes.length && <Empty/>
      }

      <blockquote className="container mt-5">
        <div className="columns is-multiline">
          
          <div className="column is-12">
            <p className="is-size-1 has-text-centered has-text-white">YOUR RECIPE LIST</p>
          </div>

          {
            recipes.length > 0 && recipes.map( recipe => <div key= { `col-${recipe._id}` } className="column is-6">
                <OneCard recipe= { recipe } />
              </div> 
            )
          }
        </div>
      </blockquote>


      <div id="btn_add" style={{ zIndex: "5" }}>
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