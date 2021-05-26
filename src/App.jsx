import 'bulma/css/bulma.min.css';
import 'magic.css/dist/magic.min.css';
import './css/App.css';

import back1 from './assets/images/back1.png';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import Main from './views/Main.jsx';
import Recipe from './views/Recipe.jsx';
import View404 from './views/404.jsx';
import About from './views/About.jsx';

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
            Copyright © 2021. All right reserved. Designed by <a href="https://eadbeel94.web.app/" target="_tab" className="pl-2"> <strong> ECODE 2021</strong></a>
          </div>
        </footer>
      </div>
    </Router>
  )
};

export default App;