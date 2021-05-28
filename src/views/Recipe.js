/** @namespace view/Recipe */

import { useState , useEffect } from 'react';
import { useHistory , useParams } from "react-router-dom";
import { randomRecipe } from 'spoonacular-api-library';
import m from 'dayjs';

import '../css/Recipe.css';

import ModalMessage from '../components/ModalMessage.js';
import Navbar from '../components/Navbar.js';

import { useModal } from '../hooks/main.js';
import fetchSend from '../js/helper.js';

/** 
 * Initial state for each input/criterion into form
 * @const {object} initRecipe
 * @memberof view/Recipe
 */
const initRecipe= { title: "" , list: [""] , inst: "" , from: "" , desc: "" , image: "" };

/**
 * Component for showing a view that contain recipe form
 * @component
 * @returns JSX Element that include view Recipe
 */
function Recipe() {
  /** 
   * Include methods to redirect
   * @const history
   * @type {useHistory}  
   * @memberof view/Recipe
   */
  const history = useHistory();
  /** 
   * Include methods to get route information params
   * @const recipeID
   * @type {useParams}  
   * @memberof view/Recipe
   */
  const { id: recipeID }= useParams();
  /** 
   * State variable that is used in modal message component
   * @constant modalM-setMessATheme-setModalM-initModalM
   * @type {useModal}  
   * @memberof view/Recipe
   */
  const [ modalM , , , , setMessATheme , setModalM , initModalM ]= useModal({ req: false, mess: "" , theme: 0 , cb: ()=>{} });
  /** 
   * State variable that include a object with recipe information 
   * @constant recipes-setRecipes
   * @type {useState}  
   * @memberof view/Recipe
   */  
  const [recipe, setRecipe] = useState(initRecipe);
  /** 
   * State variable that include a string with quantity of elements into ingredients field
   * @constant mix-setMix
   * @type {useState}  
   * @memberof view/Recipe
   */
  const [mix, setMix] = useState(initRecipe.list.length);
  /**
   * Request to backend a recipe
   * @function getAllRecipes
   * @memberof view/Recipe
   */
  const getOneRecipe= async() => {
    const url= `/recipes/getOne/${ recipeID }`
    const { stat , data , noauth }= await fetchSend( url );

    noauth && history.push('/404');
    if(!stat){
      if(!noauth){
        setMessATheme('Element not found',2)
        setTimeout(() => history.push('/views/main'), 2000);
      }
    }else{
      setRecipe( data );
      setMix( data.list.length );
    }
  };
  /**
   * Load recipe when user enter in this view
   * @callback useEffect->getOneRecipe
   * @memberof view/Recipe
   */
  useEffect(() => {
    getOneRecipe();
  }, []);
  /**
   * Using spoonacular this funcion fill recipe state and after that fill form
   * @function genRandom
   * @memberof view/Recipe
   */
  const genRandom= async ()=>{
    const { data }= await randomRecipe.get();
    const { title, extendedIngredients, instructions, creditsText, sourceUrl, image }= data.recipes[0];
    
    setRecipe({
      ...recipe,
      title: title,
      list: extendedIngredients.map( el=> el.name ),
      inst: instructions.replace( /(<([^>]+)>)/ig, ''),
      from: creditsText,
      desc: sourceUrl,
      image: image,
      datem: m().format('MMM DD, YYYY h:mm A')
    });
    setMix( extendedIngredients.length );
  };
  /**
   * if user change input value, then save value in state
   * @function setQuantity
   * @param {event} ev user change value on input event
   * @memberof view/Recipe
   */
  const setQuantity= ({ target })=>{
    let newValue= Number(target.value);
    if( newValue > 30 ) newValue= 30;
    if( 0 > newValue ) newValue = 1;
    setMix(newValue);
  };
  /**
   * if user press enter in input quantity ingredients, then will create n quantity of inputs for each ingredient
   * @function setQuantity
   * @param {event} ev user change value on input event
   * @memberof view/Recipe
   */
  const setList= ({ keyCode })=>{
    if( keyCode === 13 )
      setRecipe({ ...recipe , list: (new Array( mix )).fill("") });
  };
  /**
   * for each change into a input, this value will save into state recipe.list
   * @function handleChangeList
   * @param {Event} ev user modify any input event
   * @memberof view/Recipe
   */
  const handleChangeList= ({target})=>{
    const newList= [ ...recipe.list ];
    newList[Number(target.dataset.id)]= target.value;
    setRecipe({ ...recipe , list: newList });
  };
  /**
   * for each change into a input, this value will save into state recipe
   * @function handleChangeInps
   * @param {Event} ev user modify any input event
   * @memberof view/Recipe
   */
  const handleChangeInps= ({target})=>{
    setRecipe({ ...recipe , [target.name]: target.value });
  };
  /**
   * If use press btn save. then send cmd to backend and aftwer that saved these changes
   * @function editRecipe
   * @memberof view/Recipe
   */
  const editRecipe= () =>{
    setModalM("Do you wanna save these changes?" , 3 , async ()=>{
      const send = { ...recipe };
      delete send.datec;
      const url= `/recipes/editOne/${ recipeID }`;
      const { mess }= await fetchSend( url , "PUT" , send );

      initModalM();
      setMessATheme( mess , 2);
      //stat && setTimeout(() => history.go(0), 1000);
    });
  };
  /**
   * If use press btn delete. then send cmd to backend and after that saved these changes
   * @function deleteRecipe
   * @memberof view/Recipe
   */
  const deleteRecipe= () =>{
    setModalM("Do you wanna delete this recipe?" , 3 , async ()=>{
      const url= `/recipes/delOne/${ recipeID }`
      const { stat , mess }= await fetchSend( url , "DELETE" );

      initModalM();
      setMessATheme( mess , 2);
      stat && setTimeout(() => history.push('/views/main'), 1000);
    });
  };
  /**
   * Send backend to request logout
   * @function reqLogout
   * @memberof view/Recipe
   */
  const reqLogout= ()=>{
    setModalM("Do you wanna close this session?",3, async () =>{
      initModalM();

      const url= `/users/logout`;
      const { stat , mess }= await fetchSend( url );

      setMessATheme( mess , 2 );
      window.history.replaceState(null, null, "/");
      stat && setTimeout(() => history.push('/'), 1000);
    });
  };

  return (
    <>

      <div className="d-flex">

        <Navbar actLogout= { reqLogout } />

        <div id="Recipe" className="container">
          <div>
            {
              recipe.title.length > 0  && <blockquote className="card magictime vanishIn">

                <header className="card-header" >
                  <p className="card-header-title is-size-2 has-text-white is-justify-content-center">
                    RECIPE FULL INFORMATION 🍲
                  </p>
                </header>

                <div className="card-content p-1">
                  <div className="columns is-multiline m-0">

                    <div className="column is-3 has-text-centered">
                      <img src={ recipe.image } alt="" />
                    </div>

                    <div className="column is-9">
                      <div className="field">
                        <div className="control">
                          <textarea 
                            name= "title"
                            value= { recipe.title }
                            onChange= { handleChangeInps }
                            className="textarea is-rounded"
                            placeholder="Mix the elements in a bowl and launch" 
                            rows="2"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="column is-offset-1 is-5">

                      <div className="field is-horizontal">
                        <div className="field-label is-normal">
                          <label className="label has-text-white is-size-5">Ingredients:</label>
                        </div>
                        <div className="field-body">
                          <div className="field">
                            <p className="control">
                              <input 
                                value= { mix } 
                                onKeyDown= { setList }
                                onChange= { setQuantity }
                                className="input is-rounded has-text-right" 
                                type="number"
                                min= "1"
                                max= "30" 
                              />
                            </p>
                          </div>
                        </div>
                      </div>

                      <section className="columns is-multiline mt-1">
                        {
                          recipe.list.length > 0 && recipe.list.map( (el,ind) => <div key={ `col-${ind}` } className="column is-6">
                              <div className="field">
                                <div className="control">
                                  <input data-id={ind} value={ el } className="input is-rounded" type="text" onChange= { handleChangeList } />
                                </div>
                                <label className="label has-text-white p-1">Ingredient { String.fromCharCode(65 + ind) }</label>
                              </div>
                            </div> 
                          )
                        }
                      </section>
                    </div>

                    <div className="column is-5">
                      <label className="label has-text-white is-size-5">Instructions:</label>

                      <div className="field mt-4">
                        <div className="control">
                          <textarea 
                            name= "inst"
                            value= { recipe.inst }
                            onChange= { handleChangeInps }
                            className="textarea is-rounded"
                            placeholder="Mix the elements in a bowl and launch" 
                            rows="10"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="column is-offset-1 is-5">
                      <label className="label has-text-white is-size-5">Notes:</label>

                      <div className="field mt-4">
                        <div className="control">
                          <textarea 
                            name= "desc"
                            value= { recipe.desc }
                            onChange= { handleChangeInps }
                            className="textarea is-rounded"
                            placeholder="Mix the elements in a bowl and launch" 
                            rows="2"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="column is-5">
                      <label className="label has-text-white is-size-5">Author/Credits:</label>

                      <div className="field mt-4">
                        <div className="control">
                          <textarea 
                            name= "from"
                            value= { recipe.from }
                            onChange= { handleChangeInps }
                            className="textarea is-rounded"
                            placeholder="Mix the elements in a bowl and launch" 
                            rows="2"
                          />
                        </div>
                      </div>

                    </div>


                    <div className="column is-offset-1 is-5">
                      <div className="date">
                        <label className="label has-text-white is-size-5">Recipe created:</label>
                        <label className="has-text-white is-size-5">{ recipe.datec }</label>
                      </div>
                    </div>

                    <div className="column is-5">
                      <div className="date">
                        <label className="label has-text-white is-size-5">Last modification:</label>
                        <label className="has-text-white is-size-5">{ recipe.datem }</label>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="footer2 py-1">
                  <button className="button m-1" onClick= { deleteRecipe } >Delete ✖ </button>
                  <button className="button m-1" onClick= { genRandom } > Gen Random Recipe 🔄 </button>
                  <button className="button m-1" onClick= { editRecipe } > Save changes 💾 </button>
                </div>

              </blockquote>
            }
          </div>
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

export default Recipe;