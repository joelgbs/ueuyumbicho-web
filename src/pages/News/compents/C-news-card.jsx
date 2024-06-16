import React from "react";
import '../css/S-news-card.css'
import Carousel from '../../components/carrusel'

function Cnews(props){
    return(
        <div className="news-content">
            <h1 className="news-h1">{props.title}</h1>
            <span className="news-span">{props.fechaPublicacion}</span>
            <div className="content-news-cards">
            <Carousel>
                {/* Mostrar todas las imágenes */}
                {props.imagen.map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Imagen ${index + 1} de la noticia`} />
                ))}
            </Carousel>
            </div>
            <p className="news-p">{props.contenido}</p>
            <hr />
        </div>
    );
}

export default Cnews;
