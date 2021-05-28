/** @namespace view/Main */

import { useState , useEffect } from 'react';
import { useHistory } from "react-router-dom";

import '../css/Main.css';

import ModalMessage from '../components/ModalMessage.js';
import ModalAdd from '../components/ModalAdd.js';
import OneCard from '../components/OneCard.js';
import Empty from '../components/Empty.js';
import Navbar from '../components/Navbar.js';

import { useModal } from '../hooks/main.js';
import fetchSend from '../js/helper.js';

/**
 * Component for showing main view that contain all recipe cards
 * @component
 * @returns JSX Element that include view main
 */
function Main() {

  /** 
   * Inlcude methods to redirect
   * @const history
   * @type {useHistory}  
   * @memberof view/Main
   */
  const history= useHistory();
  /** 
   * State variable that is used in modal message component
   * @constant modalM-setMessAThemeM-setModalM-initModalM
   * @type {useModal}  
   * @memberof view/Main
   */
  const [ modalM , , , , setMessAThemeM , setModalM , initModalM ]= useModal({ req: false, mess: "" , theme: 0 , cb: ()=>{} });
  /** 
   * State variable that show/hide modal add recipe
   * @constant showModalAdd-setShowModalAdd
   * @type {useState}  
   * @memberof view/Main
   */  
  const [ showModalAdd, setShowModalAdd ] = useState(false);
  /** 
   * State variable that include a array object with recipe information 
   * @constant recipes-setRecipes
   * @type {useState}  
   * @memberof view/Main
   */  
  const [ recipes, setRecipes ] = useState([]);
  /** 
   * State variable that include user logged name
   * @constant username-setUsername
   * @type {useState}  
   * @memberof view/Main
   */  
  const [ username, setUsername] = useState("");
  /**
   * Request to backend all recipes
   * @function getAllRecipes
   * @memberof view/Main
   */
  const getAllRecipes= async() => {
    const url= `/recipes/getAll`;
    const { stat , data , mess , noauth }= await fetchSend( url );

    !stat && setMessAThemeM( mess , 2 );

    noauth && setTimeout(() => history.push('/404'), 2000);

    stat && setUsername(data.username);
    stat && setRecipes(data.list);
  };
  /**
   * Load recipes when user enter in this view
   * @callback useEffect->getAllRecipes
   * @memberof view/Main
   */
  useEffect(() => {
    getAllRecipes();
  }, []);
  /**
   * Send request to backend for create a recipe
   * @function createRecipe
   * @memberof view/Main
   */
  const createRecipe= async (send)=>{
    const url= `/recipes/addOne`;
    const { stat , data , mess }= await fetchSend( url , "POST" , send );
    setMessAThemeM( mess , 2 );
    stat && setRecipes(data);
  };
  /**
   * Send backend to request logout
   * @function reqLogout
   * @memberof view/Main
   */
  const reqLogout= ()=>{
    setModalM("Do you wanna close this session?",3, async () =>{
      initModalM();

      const url= `/users/logout`;
      const { stat , mess }= await fetchSend( url );

      setMessAThemeM( mess , 2 );
      window.history.replaceState(null, null, "/");
      stat && setTimeout(() => history.push('/'), 1000);
    });
  };

  return (
    <>
      <div className="d-flex">

        <Navbar actLogout= { reqLogout } />

        {
          recipes.length > 0 ? <blockquote id="Main" className="container mt-4">
            <div className="columns is-multiline m-0 mb-3">

              <div className="column is-12">
                <p className="is-size-1 has-text-centered has-text-white">YOUR RECIPE LIST { username } 📖</p>
              </div>
              
              {
                recipes.map( recipe => <div key= { `col-${recipe.id}` } className="column p-0 is-full is-half-tablet magictime slideDownReturn">
                    <OneCard recipe= { recipe } />
                  </div> 
                )
              }

            </div>
          </blockquote> : <Empty name= { username }/>
        }
      </div>

      <div id="btn_add">
        <div>
          <button onClick= { ()=> setShowModalAdd( true ) } className="button is-rounded is-primary"> ➕ </button>
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

export default Main;