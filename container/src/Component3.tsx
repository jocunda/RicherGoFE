import React from "react";
import { useNavigate } from "react-router-dom";

function Component3() {

  let navigate = useNavigate();
  function handleClick() {
    navigate("/comp2");
  }


  return <>comp3
    <div>
      <button onClick={handleClick}>go comp2</button>
    </div>
  </>;
}

export { Component3 };
