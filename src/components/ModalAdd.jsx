import { useState , useEffect } from 'react';
import { randomRecipe } from 'spoonacular-api-library';

import ModalMessage from './ModalMessage.jsx';
import { useModal } from '../hooks/main.jsx';

const initRecipe= { title: "" , list: [""] , inst: "" , from: "" , desc: "" , image: "" };
export default function ModalAdd(props) {
  const { show , actCreate , actClose }= props;

  const [recipe, setRecipe] = useState(initRecipe);
  const [mix, setMix] = useState(initRecipe.list.length);

  const [ modalM , , , , , setModalM , initModalM ]= useModal({ req: false, mess: "" , theme: 0 , cb: ()=>{} });

  const genRandom= async ()=>{
    const { data }= await randomRecipe.get();
    const { title, extendedIngredients, instructions, creditsText, sourceUrl, image }= data.recipes[0];
    
    setRecipe({
      title: title,
      list: extendedIngredients.map( el=> el.name ),
      inst: instructions,
      from: creditsText,
      desc: sourceUrl,
      image: image
    });
    setMix(extendedIngredients.length)
  };

  const setQuantity= ({target})=>{
    let newValue= Number(target.value);
    if( newValue > 30 ) newValue= 30;
    if( 0 > newValue ) newValue = 1;
    setMix(newValue);
    setRecipe({ ...recipe , list: (new Array( newValue )).fill("") });
  };

  const handleChangeList= ({target})=>{
    const newList= [ ...recipe.list ];
    newList[Number(target.dataset.id)]= target.value;
    setRecipe({ ...recipe , list: newList });
  };

  const handleChangeInps= ({target})=>{
    setRecipe({ ...recipe , [target.name]: target.value });
  };

  const createItem= ()=>{
    setModalM( "Do you wanna save this recipe in your cookbook?" , 3 , ()=> actCreate(recipe) );
  }

  const closeAll= () =>{
    setRecipe(initRecipe);
    setMix(String(initRecipe.list.length));
    actClose();
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
                            <label className="label has-text-white p-2">Ingredient A</label>
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
                    <div style={{ minHeight: "50%" , width: "100%" , backgroundColor: "var(--colorB)" , display: "flex" , alignItems: "center" }}>
                      <img src= { recipe.image } alt="" />
                    </div>
                  </div>
                </section>
              </div>
            </blockquote>
            <blockquote className="modalM-footer">
              <button className="button w-30 is-dark" onClick= { closeAll } >Close</button>
              <button className="button w-30 is-dark mx-3" onClick= { genRandom } >Gen Random Recipe</button>
              <button className="button w-30 is-dark" onClick= { createItem } >Save Recipe</button>
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