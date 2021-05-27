import { useState , useEffect } from 'react';
import { useHistory } from "react-router-dom";

import '../css/Main.css';

import ModalMessage from '../components/ModalMessage.jsx';
import ModalAdd from '../components/ModalAdd.jsx';
import OneCard from '../components/OneCard.jsx';
import Empty from '../components/Empty.jsx';
import Navbar from '../components/Navbar.jsx';

import { useModal } from '../hooks/main.jsx';
import fetchSend from '../js/helper.js';


export default function Main() {

  const history= useHistory();
  const [ modalM , , , , setMessAThemeM , setModalM , initModalM ]= useModal({ req: false, mess: "" , theme: 0 , cb: ()=>{} });
  const [ showModalAdd, setShowModalAdd ] = useState(false);
  const [ recipes, setRecipes ] = useState([]);
  const [ username, setUsername] = useState("");

  const getAllRecipes= async() => {
    const url= `/recipes/getAll`;
    const { stat , data , mess , noauth }= await fetchSend( url );

    !stat && setMessAThemeM( mess , 2 );

    noauth && setTimeout(() => history.push('/404'), 2000);

    stat && setUsername(data.username);
    stat && setRecipes(data.list);
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  const createRecipe= async (send)=>{
    const url= `/recipes/addOne`;
    const { stat , data , mess }= await fetchSend( url , "POST" , send );
    setMessAThemeM( mess , 2 );
    stat && setRecipes(data);
  };

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