//import { useState , useEffect } from 'react'

import '../css/ModalMessage.css';

export default function ModalMessage(props) {
  const { children , show , theme , actConfirm, actClose }= props;
  return (
    <>
      <div className={ `modalM ${ show && 'modalM-show' }` } onClick={ actClose } >
        <div className="modalM-content">
          <div className="modalM-quad" onClick= { ev=> ev.stopPropagation() }>

            <div className="modalM-header">
              Cookbook 94 Alert 
              <div className="modalM-close">
                <button onClick={ actClose } >✖</button>
              </div>
            </div>
            <div className="modalM-body">
              <h1>{ children }</h1>

            </div>
            {
              theme === 3 && <div className="modalM-footer">
                <button className="button is-dark w-45 mr-2" onClick= { actClose } >Close</button>
                <button className="button is-dark w-45 ml-2" onClick= { actConfirm } >Confirm</button>
              </div>
            }
            {
              theme === 2 && <div className="modalM-footer">
                <button className="button is-dark w-45" onClick= { actClose }>Ok</button>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}
