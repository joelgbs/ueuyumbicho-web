import React from "react";
import './css/S-horarios.css';

function cardHorarios(props){
  document.body.style.overflow = '';
    return(
      <div className="card-horarios">
        {/* <h1>{props.curso}</h1>
        <p>{props.alectivo}</p> */}
        <img src={props.image} alt="" />
      </div>
    );
}

export default cardHorarios;