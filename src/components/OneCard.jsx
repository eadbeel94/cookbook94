//import React from 'react'
import { Link } from "react-router-dom";

export default function OneCard(props) {
  const { recipe: el }= props;
  return (
    <blockquote className="columns is-multiline">
      <section className="column is-4 pr-0">
        <div className="card-left">
          <img src= { el.image } alt="Placeholder image"/>
        </div>
      </section>
      <section className="column is-8 pl-0">
        <div className="card">
          <div className="card-content p-3">
            <p className="is-size-4"> { el.title } </p>
            <p className="is-size-5"> Ingredients: { el.list.length } </p>
            <p className="is-size-6"> { el.from } </p>
            <p className="is-size-6"> { el.datem || Date() } </p>
            <p className="has-text-centered">
              <Link to= { `/views/recipe/${ el._id }` }>
                <button className="button is-small w-45 is-rounded">Show</button>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </blockquote>
  );
};