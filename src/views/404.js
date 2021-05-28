import Navbar from '../components/Navbar.js';

/**
 * Component for showing a view that contain 404 message
 * @component
 * @returns JSX Element that include view 404
 */
function View404() {
  return (
    <>
      <div className="d-flex">
        <Navbar />

        <div id="tag404">
          <h5>
            PAGE NOT FOUND
          </h5>
          <h6>
            ERROR 404
          </h6>
        </div>
      </div>
    </>
  );
};

export default View404;