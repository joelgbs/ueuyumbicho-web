import React from "react";
import '../css/noticias-content.css';

function NewsCard(){
    return(
        <div className="new-card">
            <img src={require("../assets/colegio/bastoneras-ueu.jpg")} alt="foto de noticia" />
            <h3><strong>Bastoneras en machachi</strong></h3>
            <p>En el corazón del vasto cosmos, donde las estrellas bailan en un ballet cósmico y los planetas danzan al ritmo de la gravedad, se teje una historia eterna de misterio y maravilla.</p>
            <a href="index.js">Leer</a>
        </div>
    );
}

export default NewsCard;