/** @namespace view/ModalAdd */

import { useState } from 'react';
import { randomRecipe } from 'spoonacular-api-library';

import '../css/ModalAdd.css';

import ModalMessage from './ModalMessage.js';
import { useModal } from '../hooks/main.js';

/** 
 * Initial state for each input/criterion into form
 * @const {object} initRecipe
 * @memberof view/ModalAdd
 */
const initRecipe= { title: "" , list: [""] , inst: "" , from: "" , desc: "" , image: "" };

/**
 * Component for showing a Form with fields for create a new element.
 * @component
 * @param {object} props Group elements that inicialize this component
 * @param {boolean} props.show if value is true, then show this component
 * @param {function} props.actCreate function with form value
 * @param {function} props.actClose function that close this component
 * @returns JSX Element that include a form
 */
function ModalAdd(props) {
  const { show , actCreate , actClose }= props;

  /** 
   * State variable that include all fields information
   * @constant recipe-setRecipe
   * @type {useState}  
   * @memberof view/ModalAdd
   */
  const [recipe, setRecipe] = useState(initRecipe);
  /** 
   * State variable that include a string with quantity of elements into ingredients field
   * @constant mix-setMix
   * @type {useState}  
   * @memberof view/ModalAdd
   */
  const [mix, setMix] = useState(initRecipe.list.length);
  /** 
   * State variable that is used in modal message component
   * @constant modalM-setModalM-initModalM
   * @type {useModal}  
   * @memberof view/ModalAdd
   */
  const [ modalM , , , , , setModalM , initModalM ]= useModal({ req: false, mess: "" , theme: 0 , cb: ()=>{} });
  /**
   * Using spoonacular this funcion fill recipe state and after that fill form
   * @function genRandom
   * @memberof view/ModalAdd
   */
  const genRandom= async ()=>{
    const { data }= await randomRecipe.get();
    const { title, extendedIngredients, instructions, creditsText, sourceUrl, image }= data.recipes[0];
    
    setRecipe({
      title: title,
      list: extendedIngredients.map( el=> el.name ),
      inst: instructions.replace( /(<([^>]+)>)/ig, ''),
      from: creditsText,
      desc: sourceUrl,
      image: image
    });
    setMix(extendedIngredients.length)
  };
  /**
   * if user change input value, in ingredient space will create n quantity of inputs for each ingredient
   * @function setQuantity
   * @param {event} ev user change value on input event
   * @memberof view/ModalAdd
   */
  const setQuantity= ({target})=>{
    let newValue= Number(target.value);
    if( newValue > 30 ) newValue= 30;
    if( 0 > newValue ) newValue = 1;
    setMix(newValue);
    setRecipe({ ...recipe , list: (new Array( newValue )).fill("") });
  };
  /**
   * for each change into a input, this value will save into state recipe.list
   * @function handleChangeList
   * @param {Event} ev user modify any input event
   * @memberof view/ModalAdd
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
   * @memberof view/ModalAdd
   */
  const handleChangeInps= ({target})=>{
    setRecipe({ ...recipe , [target.name]: target.value });
  };
  /**
   * Initialize recipe state and send command to close this component
   * @function closeAll
   * @memberof view/ModalAdd
   */
  const closeAll= () =>{
    setRecipe(initRecipe);
    setMix(String(initRecipe.list.length));
    actClose();
  };
  /**
   * Show confirmation message, if press yes then send information to parent
   * @function createItem
   * @memberof view/ModalAdd
   */
  const createItem= ()=>{
    setModalM( "Do you wanna save this recipe in your cookbook?" , 3 , ()=> {
      actCreate(recipe);
      initModalM();
    });
    closeAll();
  };

  return (
    <>
      <div className={ `modalA ${ show && 'modalA-show' }` } onClick={ actClose } >
        <div className="modalA-content" >
          <div className="modalA-quad" onClick= { ev=> ev.stopPropagation() } >

            <blockquote className="modalA-header">
              ADD RECIPE
              <div className="modalA-close">
                <button onClick={ actClose } >✖</button>
              </div>
            </blockquote>
            <blockquote className="modalA-body ml-1">
              <div className="columns is-multiline">

                <section className="column is-9 recipe-left">
                  <div className="columns is-multiline">

                    <div className="column is-offset-1 is-5">
                      <div className="field">
                        <div className="control">
                          <input  
                            name= "title"
                            value= { recipe.title }
                            onChange= { handleChangeInps }
                            type="text" 
                            className="input is-rounded"
                            placeholder="Awesome element"
                          />
                        </div>
                        <label className="label has-text-white p-2">Title</label>
                      </div>
                    </div>

                    <div className="column is-4">
                      <div className="field">
                        <div className="control">
                          <input 
                            value= { mix }
                            onChange= { setQuantity }
                            className="input is-rounded has-text-right"
                            type="number"
                            min= "1"
                            max= "30" 
                            placeholder=""
                          />
                        </div>
                        <label className="label has-text-white p-2">Ingredients</label>
                      </div>
                    </div>

                    {
                      recipe.list.length > 0 && recipe.list.map( (el,ind) =><div key={ `ing-${ind}` } className="column is-4 pb-0">
                          <div className="field">
                            <div className="control">
                              <input data-id={ind} value={ el } className="input is-rounded" type="text" placeholder="Username" onChange= { handleChangeList } />
                            </div>
                            <label className="label has-text-white p-2">Ingredient { String.fromCharCode(65 + ind) }</label>
                          </div>
                        </div> 
                      )
                    }

                    <section className="column is-12">
                      <div className="columns is-multiline">

                        <div className="column is-offset-1 is-10">
                          <div className="field">
                            <div className="control">
                              <textarea 
                                name= "inst"
                                value= { recipe.inst }
                                onChange= { handleChangeInps }
                                className="textarea is-rounded"
                                placeholder="Mix the elements in a bowl and launch" 
                                rows="5"
                              />
                            </div>
                            <label className="label has-text-white p-2">Procedure</label>
                          </div>
                        </div>

                        <div className="column is-offset-1 is-5">
                          <div className="field">
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
                            <label className="label has-text-white p-2">Author/Credits</label>
                          </div>
                        </div>

                        <div className="column is-5">
                          <div className="field">
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
                            <label className="label has-text-white p-2">Description</label>
                          </div>
                        </div>

                      </div>
                    </section>

                  </div>
                </section>
                <section className="column is-3">
                  <div className="recipe-img">
                    <div>
                      <img src= { recipe.image } alt="" />
                    </div>
                  </div>
                  <label className="label has-text-white recipe-preview p-2">Preview</label>
                </section>
              </div>
            </blockquote>
            <blockquote className="modalA-footer">
              <button className="button w-30" onClick= { closeAll } >Close</button>
              <button className="button w-30 mx-3" onClick= { genRandom } >Gen Random Recipe</button>
              <button className="button w-30" onClick= { createItem } >Save Recipe</button>
            </blockquote>

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

export default ModalAdd;