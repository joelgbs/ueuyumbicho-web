import React from 'react';
import '../css/S-card-news.css';

const CardNews = () => {
  return (
    <div className="card">
      <div className="header">
        <h3 className="title">Noticia Publicada</h3>
        <p className="subtitle">
          Aquí puedes ver el contenido de la noticia que has publicado.
        </p>
      </div>
      <div className="content">
        <div className="section">
          <h2 className="section-title">Título de la Noticia</h2>
          <p className="section-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.
          </p>
        </div>
        <div className="section">
          <h2 className="section-title">Contenido</h2>
          <p className="section-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl. Sed euismod, nisl vel tincidunt.
          </p>
        </div>
        <div className="section">
          <h2 className="section-title">Imagen</h2>
          <img src="/placeholder.svg" alt="Placeholder" />
        </div>
      </div>
    </div>
  );
};

export default CardNews;
