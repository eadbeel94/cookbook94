import '../css/ModalMessage.css';

/**
 * Component for showing a Modal with a message.
 * @component
 * @param {object} props Group elements that inicialize this component
 * @param {string} props.children Inlcude message to show in this modal
 * @param {boolean} props.show if value is true, then show this component
 * @param {number}  props.theme if value is 2 then show only button, with 3 show two buttons
 * @param {function} props.actConfirm function that execute when user press confirm button
 * @param {function} props.actClose function that close this component
 * @returns JSX Element that include a Modal
 */
function ModalMessage(props) {
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
  );
};

export default ModalMessage;