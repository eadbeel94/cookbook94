import Navbar from '../components/Navbar.jsx';

import ecode from '../assets/images/ecode.png'

import '../css/About.css';

export default function About() {
  return (
    <>
      <div className="d-flex" style={{ minHeight: "92.5vh" }}>

        <Navbar/>

        <section id="about" className="container mt-3">
          <div className="columns is-multiline">
            <div className="column is-7">

              <blockquote className="card h-100">
                <header className="card-header">
                  <p className="card-header-title">
                    ABOUT WEB APP
                  </p>
                </header>
                <div className="card-content about-first">
                  <div className="content has-text-justified">
                    Cookbook 94 can save all recipes that you need, if you have no idea about what recipe you wanna save, you can generate a random recipe
                    <p className="pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, ut possimus? Quas fuga iste in ut ipsum odit debitis, nam magnam sequi quia hic nihil non qui ratione quam pariatur voluptate quod obcaecati! Vitae fuga similique tenetur at, placeat beatae.</p>
                  </div>
                </div>
              </blockquote> 

            </div>
            <div className="column is-5">
              <blockquote className="card h-100">
                <header className="card-header">
                  <p className="card-header-title">
                    ABOUT DEVELOP
                  </p>
                </header>
                <div className="card-content">
                  <div className="content has-text-centered ">
                    This app was created using Javascript stack MERN and made by WEB developer Adbeel Estrada

                    <div className="about-image">
                      <img src={ ecode } alt="" />
                    </div>

                    <h5>See documentation: <a href="/static/doc/" target="_blank">documentation</a></h5>
                    <h5>About developer: <a href="https://eadbeel94.web.app/" target="_blank">eadbeel.web.app</a></h5>
                  </div>
                </div>
              </blockquote> 
            </div>
            <div className="column is-12">
              <blockquote className="card h-100">
                <header className="card-header">
                  <p className="card-header-title">
                    TECHNOLOGIES
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">

                    <h4 className="has-text-centered has-text-white is-size-5">Some technologies used in this project</h4>

                    <section className="columns"> 
                      <div className="column is-6">

                        <ul className="menu-list">

                          <li>
                            <a> FRONTEND </a>
                            <ul>
                              <li><a>React JS</a></li>
                              <li><a>React Router JS</a></li>
                              <li><a>Bulma CSS</a></li>
                              <li><a>Magic CSS</a></li>
                              <li><a>Spoonacular API</a></li>
                            </ul>
                          </li>

                        </ul>
                      </div>
                      <div className="column is-6">
                        <ul className="menu-list">

                          <li>
                            <a> BACKEND </a>
                            <ul>
                              <li><a>Node JS</a></li>
                              <li><a>Express</a></li>
                              <li><a>Mongoose</a></li>
                              <li><a>Passport</a></li>
                              <li><a>B-crypt</a></li>
                            </ul>
                          </li>

                        </ul>
                      </div>
                    </section>

                  </div>
                </div>
              </blockquote> 
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
