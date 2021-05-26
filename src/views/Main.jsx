import { useState , useEffect } from 'react';
import { useHistory } from "react-router-dom";

import '../css/Main.css';

import ModalMessage from '../components/ModalMessage.jsx';
import ModalAdd from '../components/ModalAdd.jsx';
import OneCard from '../components/OneCard.jsx';
import Empty from '../components/Empty.jsx';

import { useModal } from '../hooks/main.jsx';
import fetchSend from '../js/helper.js';

export default function Main() {

  const history= useHistory();
  const [ modalM , , , , setMessAThemeM , , initModalM ]= useModal({ req: false, mess: "" , theme: 0 , cb: ()=>{} });
  const [ showModalAdd, setShowModalAdd ] = useState(false);
  const [ recipes, setRecipes ] = useState([]);
  const [ username, setUsername] = useState("");

  const getAllRecipes= async() => {
    const url= `/recipes/getAll`;
    const { stat , data , mess , noauth }= await fetchSend( url );

    noauth && history.push('/404');
    !stat && setMessAThemeM( mess , 2 );
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

  return (
    <>
      {
        recipes.length > 0 ? <blockquote id="Main" className="container mt-4">
          <div className="columns is-multiline mb-3">

            <div className="column is-12">
              <p className="is-size-1 has-text-centered has-text-white">YOUR RECIPE LIST { username } 📖</p>
            </div>
            
            {
              recipes.map( recipe => <div key= { `col-${recipe._id}` } className="column is-6 magictime slideDownReturn">
                  <OneCard recipe= { recipe } />
                </div> 
              )
            }

          </div>
        </blockquote> : <Empty name= { username }/>
      }

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