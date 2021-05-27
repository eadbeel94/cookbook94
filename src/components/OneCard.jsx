//import React from 'react'
import { Link } from "react-router-dom";

import '../css/OneCard.css';

export default function OneCard(props) {
  const { recipe: el }= props;
  return (
    <blockquote id="OneCard" className="columns is-multiline m-2">
      <section className="column is-4 p-0">
        <div className="card-left">
          <img src= { el.image } alt="a"/>
        </div>
      </section>
      <section className="column is-8 p-0">
        <div className="card">
          <div className="card-content p-3">
            <p className="is-size-4"> { el.title } </p>
            <p className="is-size-5"> Ingredients: { el.qty } </p>
            <p className="is-size-6"> { el.from } </p>
            <p className="is-size-6"> Last change: { el.datem } </p>
            <p className="has-text-centered">
              <Link to= { `/views/recipe/${ el.id }` }>
                <button className="button is-small w-45">Show <strong className="pl-3">↗</strong></button>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </blockquote>
  );
};