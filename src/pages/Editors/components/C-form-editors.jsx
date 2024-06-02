import React from 'react';
import '../css/S-form-editors.css'

const PublicarNoticia = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Publicar Noticia</h1>
        <p className="subtitle">
          Comparte tus noticias con nuestros lectores.
        </p>
      </div>
      <form className="form">
        <div className="field">
          <label
            className="label"
            htmlFor="title"
          >
            Título de la Noticia
          </label>
          <input
            className="input"
            id="title"
            placeholder="Ingresa el título de la noticia"
          />
        </div>
        <div className="field">
          <label
            className="label"
            htmlFor="content"
          >
            Contenido
          </label>
          <textarea
            className="textarea"
            id="content"
            placeholder="Escribe el contenido de la noticia"
          ></textarea>
        </div>
        <div className="field">
          <label
            className="label"
            htmlFor="image"
          >
            Imagen (opcional)
          </label>
          <input
            className="input"
            id="image"
            type="file"
          />
        </div>
        <button
          className="button"
          type="submit"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default PublicarNoticia;
