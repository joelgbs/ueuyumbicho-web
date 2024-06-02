import React from "react";
import { useNavigate } from "react-router-dom"; // Asumiendo que estás utilizando React Router
import '../css/S-cards-home.css';

function Card(props){
    const navigate = useNavigate();

    function handleClick() {
        navigate(props.link); // Utiliza la prop 'link' para la navegación dinámica
    }

    return (
        <div className="card-H">
            <img className="card-imagen-img" src={props.imagen} alt="" />
            <h1 className="card-title-h1">{props.title}</h1>
            <p className="card-info-p">{props.info}</p>
            <a  className="card-link-a" onClick={handleClick}>Conoce mas</a>
        </div>
    );
}

export default Card;
