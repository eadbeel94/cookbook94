//import React from 'react'

export default function Empty(props) {
  const { name }= props;
  return (
    <div id="lbl_Empty" className="flex-center" style= {{ height: "92.5vh" }}>
      <div className="has-text-centered has-text-primary" style={{ backgroundColor: "rgba(25,34,47,0.75)" , fontFamily: "var(--title)" }}>
        <p className="is-size-2">YOU HAVE</p>
        <p className="is-size-2">NO RECIPES</p>
        <p className="is-size-2">{ name }</p>
        <p style={{ fontSize: "5rem" }}>😔</p>
      </div>
    </div>
  )
}
