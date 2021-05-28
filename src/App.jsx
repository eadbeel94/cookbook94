import 'bulma/css/bulma.min.css';
import 'magic.css/dist/magic.min.css';
import './css/App.css';

import back1 from './assets/images/back1.png';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './views/Login.js';
import Register from './views/Register.js';
import Main from './views/Main.js';
import Recipe from './views/Recipe.js';
import View404 from './views/404.js';
import About from './views/About.js';

/**
 * Component that include all project
 * @component
 * @returns JSX Element that include all
 */
function App() { 
  return (
    <Router>
      <div>
        <div id="backgroundA">
          <div className="figureA"></div>
          <div className="figureB"></div>
          <div className="figureC">
            <p>Cookbook 94</p> 
            <img src={ back1 } alt="" /> 
          </div>
        </div>

        <Switch>
          <Route exact path="/" component= { Login } />
          <Route exact path="/views/login" component= { Login } />
          <Route exact path="/views/main" component= { Main } />
          <Route exact path="/views/register" component= { Register } />
          <Route exact path="/views/recipe/:id" component= { Recipe } />
          <Route exact path="/views/about" component= { About } />
          
          <Route path="*" component= { View404 } />
        </Switch>

        <footer>
          <div>
            Copyright © 2021. All right reserved. Designed by <Link to="/views/about" target="_blank" className="pl-2"> <strong> ECODE 2021</strong></Link>
          </div>
        </footer>
      </div>
    </Router>
  )
};

export default App;

//<a href="/views/about" target="_tab" className="pl-2"> <strong> ECODE 2021</strong></a>