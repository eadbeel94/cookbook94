//import React from 'react'

export default function Empty(props) {
  const { name }= props;
  return (
    <div id="lbl_Empty" className="flex-center">
      <div className="has-text-centered has-text-primary">
        <p className="is-size-2">YOU HAVE</p>
        <p className="is-size-2">NO RECIPES</p>
        <p className="is-size-2">{ name }</p>
        <p className="emoji1">😔</p>
      </div>
    </div>
  )
}
