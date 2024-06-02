import React from 'react';
import '../css/S-card-news.css';

const CardNews = ({ title, content, imageUrl }) => {
  return (
    <div className="card">
      <div className="content">
        <div className="section">
          <h2 className="section-title">{title}</h2>
        </div>
        <div className="section">
          <p className="section-text">{content}</p>
        </div>
        <div className="section">
          {/* Mostrar solo la primera imagen */}
          <img src={imageUrl} alt="Imagen de la noticia" />
        </div>
      </div>
    </div>
  );
};

export default CardNews;
