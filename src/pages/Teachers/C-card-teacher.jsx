import React from "react";
import './css/S-teachers.css'

function CardTeacher(props){
    return(
        <div className="card-content-T">
            <div className="imagen-teacher">
                <img src={props.imagen} alt="" />
            </div>
            <div className="info-teacher">
                <h1>{props.profesion}</h1>
                <span>{props.nombre}</span>
                <p><strong>Area:</strong> {props.area}</p>
                <p>{props.descripcion}</p>
            </div>
        </div>
    );
}

export default CardTeacher;