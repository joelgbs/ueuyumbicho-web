import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Importa Firebase v9 compat
import 'firebase/compat/database'; // Importa el módulo de base de datos de Firebase
import PublicarNoticia from './components/C-form-editors';
import CardNews from './components/C-card-news';
import './css/S-editor.css';

function Editors() {
    document.body.style.overflow = '';
    const navigate = useNavigate();
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        // Recoger el token almacenado en el almacenamiento local del navegador
        const token = localStorage.getItem('token');

        // Verificar si hay un token almacenado
        if (!token) {
            // Si no hay token, redirigir al usuario a la ventana de inicio de sesión
            navigate('/login');
        } else {
            // Obtener las noticias desde la base de datos de Firebase
            const noticiasRef = firebase.database().ref('noticias');
            noticiasRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const noticiasArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
                    // Invertir el orden de las noticias para mostrar las más recientes primero
                    setNoticias(noticiasArray.reverse());
                }
            });

            // Limpiar el listener al desmontar el componente
            return () => noticiasRef.off();
        }
    }, [navigate]);

    const handleDelete = (id) => {
        // Lógica para eliminar la noticia
        if (window.confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
            firebase.database().ref(`noticias/${id}`).remove()
                .then(() => {
                    console.log("Noticia eliminada con éxito");
                })
                .catch((error) => {
                    console.error('Error al eliminar la noticia:', error);
                });
        }
    };
    
    const handleEdit = (id) => {
        // Obtener la noticia que se va a editar, podrías obtenerla de una base de datos o de un estado local.
        const noticia = noticias.find((noticia) => noticia.id === id);
        
        // Alerta para editar el título de la noticia
        const newTitle = prompt("Editar título de la noticia:", noticia.title);
        if (newTitle !== null) {
            // Si el usuario no cancela la operación, actualizamos el título de la noticia
            noticia.title = newTitle;
        }
        
        // Alerta para editar el contenido de la noticia
        const newContent = prompt("Editar contenido de la noticia:", noticia.content);
        if (newContent !== null) {
            // Si el usuario no cancela la operación, actualizamos el contenido de la noticia
            noticia.content = newContent;
        }
        
        // Alerta para editar la URL de la imagen de la noticia
        const newImageUrl = prompt("Editar URL de la imagen de la noticia:", noticia.imageUrl);
        if (newImageUrl !== null) {
            // Si el usuario no cancela la operación, actualizamos la URL de la imagen de la noticia
            noticia.imageUrl = newImageUrl;
        }
    
        // Por ahora, simplemente mostramos un mensaje de alerta con los nuevos datos
        alert(`Noticia editada con éxito:\n\nTítulo: ${noticia.title}\nContenido: ${noticia.content}\nImagen URL: ${noticia.imageUrl}`);
    };
    
  
    return (
        <div>
            <PublicarNoticia />
            {/* Cargar las noticias usando el componente CardNews */}
            <div className="noticias-card-content">
                {noticias.map((noticia) => (
                    <div key={noticia.id}>
                        <CardNews title={noticia.title} content={noticia.content} imageUrl={noticia.images} />
                        <div>
                            <button onClick={() => handleDelete(noticia.id)}>Eliminar Noticia</button>
                            <button onClick={() => handleEdit(noticia.id)}>Editar Noticia</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Editors;
