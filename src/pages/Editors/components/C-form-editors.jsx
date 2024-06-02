import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // Importa Firebase v9 compat
import 'firebase/compat/database'; // Importa el módulo de base de datos de Firebase
import 'firebase/compat/storage'; // Importa el módulo de almacenamiento de Firebase
import '../css/S-form-editors.css';

// Configuración de Firebase (reemplaza con tu propia configuración)
const firebaseConfig = {
    apiKey: "AIzaSyAqbn4SXVYSO0f75VKu2WUSC7tLUN3_uYQ",
    authDomain: "uyumbichoweb.firebaseapp.com",
    databaseURL: "https://uyumbichoweb-default-rtdb.firebaseio.com",
    projectId: "uyumbichoweb",
    storageBucket: "uyumbichoweb.appspot.com",
    messagingSenderId: "294140970341",
    appId: "1:294140970341:web:685c6d36bb0a1feafdcd8c",
    measurementId: "G-CYDCB6288S"
};

// Inicializa Firebase si aún no se ha inicializado
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
const storage = firebase.storage();

const PublicarNoticia = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Obtener la fecha y hora actuales
      const fechaPublicacion = new Date().toISOString();

      // Subir imágenes a Firebase Storage
      const imageUrls = await Promise.all(images.map(async (image) => {
        const storageRef = storage.ref(`images/${image.name}`);
        await storageRef.put(image);
        const url = await storageRef.getDownloadURL();
        return url;
      }));

      // Guardar datos en Firebase Realtime Database
      const newNoticiaRef = database.ref('noticias').push();
      await newNoticiaRef.set({
        title,
        content,
        images: imageUrls,
        fechaPublicacion // Añadir la fecha de publicación
      });

      // Resetear el formulario
      setTitle('');
      setContent('');
      setImages([]);

      alert('Noticia publicada con éxito');
    } catch (error) {
      console.error('Error al publicar la noticia:', error);
      alert('Hubo un error al publicar la noticia. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Publicar Noticia</h1>
        <p className="subtitle">
          Comparte tus noticias con nuestros lectores.
        </p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title">
            Título de la Noticia
          </label>
          <input
            className="input"
            id="title"
            placeholder="Ingresa el título de la noticia"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="content">
            Contenido
          </label>
          <textarea
            className="textarea"
            id="content"
            placeholder="Escribe el contenido de la noticia"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="field">
          <label className="label" htmlFor="images">
            Imágenes (opcional)
          </label>
          <input
            className="input"
            id="images"
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button className="button" type="submit">
          Publicar
        </button>
      </form>
    </div>
  );
};

export default PublicarNoticia;
