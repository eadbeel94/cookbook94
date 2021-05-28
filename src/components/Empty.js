import { useState, useEffect } from 'react';

/**
 * Component for showing details about empty message.
 * @component
 * @returns JSX Element that include a message
 */
function Empty(props) {
  const { name }= props;

  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 1000);
  }, []);

  return (
    <div id="lbl_Empty" className="flex-center" style={{ display: `${ show ? 'flex' : 'none' }` }} >
      <div className="has-text-centered has-text-primary">
        <p className="is-size-2">YOU HAVE</p>
        <p className="is-size-2">NO RECIPES</p>
        <p className="is-size-2">{ name }</p>
        <p className="emoji1">😔</p>
      </div>
    </div>
  );
};

export default Empty;