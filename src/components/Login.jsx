import { useState , useEffect } from 'react';

import { Link } from "react-router-dom";

export default function Login() {

  return (
    <>
      <div className="login">
        <div className="has-text-white" style={{ width: "80%" , height: "70%" , display: "flex" }}>
          <section className="login-left">
            <div style={{ height: "100%" , width: "90%" , margin: "auto" }}>

              <div style={{ backgroundColor: "var(--colorD)" , width: "150px", height: "150px", margin: "auto" , borderRadius: "50%" , marginTop: "2rem" }}>

              </div>
              <h5 style={{ textAlign: "center" , marginTop: "2rem" , fontSize: "2rem" }}>
                Welcome to 
                <p>Cookbook 94</p>
              </h5>
              <div style={{ display: "flex" , justifyContent: "space-evenly" , marginTop: "3rem" }}>

                <div className="r1" />
                <div className="r1" />
                <div className="r1" />
                <div className="r1" />
                
              </div>

            </div>
          </section>
          <section className="login-right">

            <div style={{ height: "100%" , width: "70%" , margin: "auto" }}>

              <div className="field" style={{ marginTop: "7rem" }}>
                <div className="control">
                  <input className="input is-rounded" type="text" placeholder="Username"/>
                </div>
              </div>

              <div className="field" style={{ marginTop: "2rem" }}>
                <div className="control">
                  <input className="input is-rounded" type="password" placeholder="Password"/>
                </div>
              </div>

              <button className="button is-fullwidth is-rounded" style={{ marginTop: "6rem" }}>
                Login
              </button>
              <Link to="/views/register">
                <button className="button is-fullwidth is-rounded" style={{ marginTop: "1rem" }}>
                  Register user
                </button>
              </Link>

            </div>
          
          </section>
        </div>
      </div>


    </>
  );
};

/*
            <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Text input"/>
              </div>
              <label class="label">Name</label>
            </div>

 */