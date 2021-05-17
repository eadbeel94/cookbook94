import { useState } from 'react';

import Modal from './Modal';

import { useModal1 } from '../hooks/main';

const d= document;

const reorderPhrase= ( main="" ) => {
  const phrases= [];
  const rand= [];
  const wSplit= main.replace('\n','').split(' ');
  do {
    const qty= Math.floor( Math.random() * 3 ) + 2;
    phrases.push( wSplit.splice( 0 , qty ).join(" ") )
  } while (wSplit.length > 0);
  //const phrases2= [...phrases];
  do {
    const qty= Math.floor( Math.random() * phrases.length );
    rand.push( phrases.splice( qty , 1 )[0] )
  } while (phrases.length > 0);
  return rand;
};

const genSpeaker= async ( text )=>{
  await window.speechSynthesis.speak(  new SpeechSynthesisUtterance(text)  )
}

const initModal= { req: false, mess: "" , theme: 2 , cb: ()=>{} };

export default function Body() {

  const [mainText, setMainText] = useState("");
  const [hideText, setHideText] = useState("");

  const [btns, setBtns] = useState([]);
  const [newList, setNewList] = useState([]);

  const [ 
    modal, 
    , 
    ,
    ,
    modMessTheme,
    modAll,
    modClose
  ] = useModal1(initModal);

  const processText= async()=>{
    let receiveText= mainText;
    receiveText= receiveText.split(" ");

    if( 5 > receiveText.length ){
      modMessTheme("Your text has no more 5 words",2);
    }else{
      await genSpeaker(mainText);
      setHideText( mainText );
    
      setBtns( reorderPhrase( mainText ) );
      d.querySelectorAll(`button[data-id]`).forEach( el => el.classList.remove('disabled') );
      setMainText("");
      setNewList([]);
    };
  };

  const movePhrases= (pos)=>{
    const alist= [...newList];

    const notFound= isNaN( alist.filter( el => el === pos )[0] );
    notFound && alist.push(pos);

    setNewList( alist );

    d.querySelector(`button[data-id="${pos}"]`).classList.add('disabled');
  };

  const deleteBtn= (pos)=>{
    let alist= [...newList];

    alist= alist.filter( el => el !== pos );

    d.querySelector(`button[data-id="${pos}"]`).classList.remove('disabled');
    setNewList( alist );
  };

  const compareResult= ()=>{
    modClose();
    const newText= newList.map( pos => btns[pos] ).join(" ");
    const comparer= newText === hideText;

    modMessTheme( `Your selection is ${ comparer ? "correct 😃" : "incorrect 🙃🤮" }` , 2 );
    setNewList([]);

    if(!comparer){
      console.log( `Answer is -> ` , hideText );
      d.querySelectorAll(`button[data-id]`).forEach( el => el.classList.remove('disabled') );
    }else{
      setBtns([]);
      setHideText("");
    };
    //setMainText("");
    //setHideText("");
    //d.querySelector(`button[data-id="${pos}"]`).classList.remove('disabled');
    //setBtns([]);
  };

  const finished= ()=>{
    modAll("Do you finish exercise?" , 3 , compareResult )
  };

  const reStart= ()=>{
    setBtns([]);
    setNewList([]);
    setMainText("");
    setHideText("");
  }

  return (
    <>
      <div className="mainBody">
        <div className="h-100">
          <div className="subBody">
            <section className="board1">

              <textarea value= { mainText } placeholder="Enter a text" onChange={ ev => setMainText( ev.target.value ) } ></textarea>
              <button className="btn1 w-15" onClick= { processText } >Process</button>

            </section>
          </div>
          <div className="subBody">
            <section className="board1">

              <div className="p-3">
                { 
                  btns.map( (btn,ind) => <button key={ `btn-${ ind }` } data-id= { ind } className="btn1" onClick= { ()=>movePhrases(ind) } > { btn } </button>  )
                }
              </div>


            </section>
          </div>
          <div className="subBody">
            <section className="board1">

              <div className="p-3 w-85">
                { 
                  newList.map( pos => <button key={ `newBtn-${ pos }` } className="btn1" onClick= { ()=>deleteBtn(pos) } > { btns[pos] } </button>  )
                }
              </div>
              <button className="btn1 w-15" onClick={ finished }>Check </button> 
              <button className="btn1 w-15" onClick={ reStart }>Restart </button> 
            </section>
          </div>
        </div>
      </div>
      <Modal 
        show= { modal.req } 
        theme= { modal.theme } 
        actClose= { modClose } 
        actConfirm= { modal.cb } 
      > 
        { modal.mess } 
      </Modal>
    </>
  );
};