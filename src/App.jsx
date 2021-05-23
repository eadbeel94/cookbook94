import 'bulma/css/bulma.min.css'
import './css/App.css';
import './css/Login.css';
import './css/ModalAdd.css';
import './css/ModalMessage.css';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Main from './components/Main.jsx';

function App() { 
  return (
    <Router>
      <div>
        <div id="backgroundA">
          <div className="figureA"></div>
          <div className="figureB"></div>
        </div>

        <Switch>

          <Route path="/views/register">
            <Register />
          </Route>
          <Route path="/views/main">
            <Main />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  )
};

export default App;