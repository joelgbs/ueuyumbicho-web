import React from "react";
import '../css/S-min-portada.css';

function Minportada(props) {
    return (
        <div 
            className="min-portada" 
            style={{ 
                backgroundImage: `url(${props.imagen})`
            }}
        >
            <div className="div-capa"></div>
            <h1>{props.titulo}</h1>
        </div>
    );
}

export default Minportada;
