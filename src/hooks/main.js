/** @namespace view/hooks */

import { useState } from 'react'
/**
 * React custom hook that allow change state
 * @function useModal
 * @memberof view/hooks
 * @param {object} show include variable state
 * @param {function} setMessage include function to change property message
 * @param {function} setTheme include function to change property theme
 * @param {function} setCB include function to change property Callback
 * @param {function} setMessATheme include function to change property message and theme
 * @param {function} setAll include function to change all propierties
 * @param {function} close include function to initialize state
 */
export const useModal= ({ req, mess , theme , cb }) => {
  const [show, setShow] = useState({ req , mess , theme , cb });

  const setMessage= (newMessage)=> setShow({ ...show, req: true , mess: newMessage });

  const setTheme= (newTheme)=> setShow({ ...show, req: true , theme: newTheme });

  const setCB= (newCB)=> setShow({ ...show, req: true , cb: newCB });

  const setMessATheme= ( newM , newT )=> setShow({ ...show, req: true , mess: newM , theme: newT });

  const setAll= ( newM , newT , newC )=> setShow({ req: true , mess: newM , theme: newT , cb: newC });

  const close= ()=> setShow({ req , mess , theme , cb });

  return [
    show, 
    setMessage,
    setTheme,
    setCB,
    setMessATheme,
    setAll,
    close
  ];
};
