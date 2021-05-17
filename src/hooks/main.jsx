import { useState } from 'react'

export const useModal1= ({ req, mess , theme , cb }) => {
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
