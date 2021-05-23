import { useState , useEffect } from 'react';

import { Link } from "react-router-dom";

export default function Login() {

  return (
    <>
      <div className="flex-center">
        <div className="py-5" style={{ width: "50%" , display: "flex" , backgroundColor: "var(--colorB)" }}>

          <section style={{ height: "100%" , width: "70%" , margin: "auto" }}>

            <h5 className="has-text-white has-text-centered my-1 is-size-2">Register</h5>

            <div className="field mt-4">
              <div className="control">
                <input className="input is-rounded" type="text" placeholder="Username"/>
              </div>
              <label className="label has-text-white pl-2">Full name</label>
            </div>

            <div className="field mt-4">
              <div className="control">
                <input className="input is-rounded" type="password" placeholder="Password"/>
              </div>
              <label className="label has-text-white pl-2">Username</label>
            </div>

            <div className="field mt-4">
              <div className="control">
                <input className="input is-rounded" type="text" placeholder="Username"/>
              </div>
              <label className="label has-text-white pl-2">Password</label>
            </div>

            <div className="field mt-4">
              <div className="control">
                <input className="input is-rounded" type="password" placeholder="Password"/>
              </div>
              <label className="label has-text-white pl-2">Confirm Password</label>
            </div>

            <div style={{ marginTop: "2rem" , marginBottom: "2rem"  }}>
              <button className="button is-fullwidth is-rounded" style={{ margin: "auto" , width: "80%" }}>
                Save user
              </button>
              <Link to="/">
                <button className="button is-fullwidth is-rounded mt-4" style={{ margin: "auto" , width: "80%" }}>
                  Return
                </button>
              </Link>

            </div>

          </section>

        </div>
      </div>
    </>
  );
};