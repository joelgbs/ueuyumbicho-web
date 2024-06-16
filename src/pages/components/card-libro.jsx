import React from "react";
import '../styles/card-libro.css';

function LibroCard(props) {
    return (
        <div className="libro-card" onClick={props.onClick}>
            <img src={props.imagen} alt="" />
            <h4>{props.titulo}</h4>
            <p><strong>Autor: </strong>{props.autor}</p>
        </div>
    );
}

export default LibroCard;
