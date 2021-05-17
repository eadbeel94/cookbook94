//import { useState , useEffect } from 'react'

export default function Modal(props) {
  const { children , show , theme , actConfirm, actClose }= props;
  return (
    <>
      <div className={ `modal ${ show && 'mShow' }` } onClick={ actClose } >
        <div className="modal-content" onClick= { ev=> ev.stopPropagation() } >
          <div className="modal-quad">

            <div className="modal-header">
              COMPARER ALERT 
              <div className="modal-close">
                <button onClick={ actClose } >✖</button>
              </div>
            </div>
            <div className="modal-body">
              <h1>{ children }</h1>

            </div>
            {
              theme === 3 && <div className="modal-footer">
                <button className="btn1 w-45" onClick= { actClose } >Close</button>
                <button className="btn1 w-45" onClick= { actConfirm } >Confirm</button>
              </div>
            }
            {
              theme === 2 && <div className="modal-footer">
                <button className="btn1 w-45" onClick= { actClose }>Ok</button>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}
