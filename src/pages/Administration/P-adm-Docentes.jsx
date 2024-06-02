import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // Importa Firebase v9 compat
import 'firebase/compat/database'; // Importa el módulo de base de datos de Firebase
import './css/S-adm-Docentes.css';

// Define la configuración de Firebase
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

// Inicializa Firebase con la configuración
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Si ya hay una instancia de Firebase, úsala
}

function Adocentes() {
    const [image, setImage] = useState(null);
    const [profesion, setProfesion] = useState('');
    const [nombre, setNombre] = useState('');
    const [area, setArea] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    let fileInputRef = null;

    const handleButtonClick = () => {
        if (fileInputRef) {
            fileInputRef.click();
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Evita la recarga de la página al enviar el formulario
        
        // Guarda los datos del docente en la base de datos de Firebase
        firebase.database().ref('docentes').push({
            image: image,
            profesion: profesion,
            nombre: nombre,
            area: area,
            descripcion: descripcion
        }).then(() => {
            // Muestra la alerta y limpia el formulario después de enviar con éxito
            setShowAlert(true);
            setImage(null);
            setProfesion('');
            setNombre('');
            setArea('');
            setDescripcion('');
            setTimeout(() => {
                setShowAlert(false);
            }, 3000); // Oculta la alerta después de 3 segundos
        }).catch((error) => {
            console.error('Error al guardar en Firebase:', error);
        });
    };

    return (
        <div className="body-Adocentes">
            <div className="add-docentes">
            <h2>Agregar Docentes</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="upload-images">
                        {image && <img src={image} alt="Preview" style={{ maxWidth: '50%', maxHeight: '200px' }} />}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            ref={(input) => (fileInputRef = input)}
                        />
                        <button type="button" style={{ opacity: 1 }} onClick={handleButtonClick}>Subir Imagen</button>
                    </div>
                    <div className="upload-info">
                        <h3>Informacion del docente</h3>
                        <label htmlFor="">Profesion/Cargo:</label>
                        <input type="text" placeholder="Profesion: Ingeniero, etc" value={profesion} onChange={(e) => setProfesion(e.target.value)} />
                        <label htmlFor="">Nombre del docente: </label>
                        <input type="text" placeholder="Nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <label htmlFor="">Area: </label>
                        <input type="text" placeholder="Area" name="area" value={area} onChange={(e) => setArea(e.target.value)} />
                        <label htmlFor=""></label>
                        <label htmlFor="">Descripcion:</label>
                        <textarea name="descripcion" placeholder="Descripcion" id="" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                        <button type="submit">Guardar</button>
                        {showAlert && <div className="alert">Datos guardados exitosamente</div>}
                    </div>
                </form>
            </div>
        </div>
    );
}

function Tabladocentes() {
    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        // Obtener los docentes de la base de datos al cargar el componente
        const docentesRef = firebase.database().ref('docentes');
        docentesRef.on('value', (snapshot) => {
            const docentesData = snapshot.val();
            if (docentesData) {
                const docentesArray = Object.entries(docentesData).map(([id, docente]) => ({ id, ...docente }));
                // Invertir el orden de los docentes
                setDocentes(docentesArray.reverse());
            }
        });
        // Detener la escucha al desmontar el componente
        return () => docentesRef.off('value');
    }, []);


    const handleEdit = (id) => {
        const docente = docentes.find((d) => d.id === id);
        if (docente) {
            const newProfesion = prompt("Editar Profesión", docente.profesion);
            const newNombre = prompt("Editar Nombre", docente.nombre);
            const newArea = prompt("Editar Área", docente.area);
            const newDescripcion = prompt("Editar Descripción", docente.descripcion);

            if (newProfesion && newNombre && newArea && newDescripcion) {
                firebase.database().ref(`docentes/${id}`).update({
                    profesion: newProfesion,
                    nombre: newNombre,
                    area: newArea,
                    descripcion: newDescripcion
                }).then(() => {
                    console.log("Docente editado con éxito");
                }).catch((error) => {
                    console.error('Error al editar el docente:', error);
                });
            }
        }
    };

    const handleEditImage = (id) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const selectedImage = e.target.files[0];
            if (selectedImage) {
                const reader = new FileReader();
                reader.onload = () => {
                    const imageDataUrl = reader.result;
                    firebase.database().ref(`docentes/${id}`).update({ image: imageDataUrl })
                        .then(() => console.log("Imagen actualizada con éxito"))
                        .catch((error) => console.error("Error al actualizar la imagen:", error));
                };
                reader.readAsDataURL(selectedImage);
            }
        };
        input.click();
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este docente?");
        if (confirmDelete) {
            firebase.database().ref(`docentes/${id}`).remove()
                .then(() => {
                    console.log("Docente eliminado con éxito");
                })
                .catch((error) => {
                    console.error('Error al eliminar el docente:', error);
                });
        }
    };

    return (
        <div className="tabla-docentes">
            <h2>Docentes Registrados</h2>
            <table className="table-style">
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Profesión</th>
                        <th>Nombre</th>
                        <th>Área</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.map((docente) => (
                        <tr key={docente.id}>
                            <td>
                                <img src={docente.image} alt={docente.nombre} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                <button onClick={() => handleEditImage(docente.id)}>Editar Foto</button>
                            </td>
                            <td>{docente.profesion}</td>
                            <td>{docente.nombre}</td>
                            <td>{docente.area}</td>
                            <td>{docente.descripcion}</td>
                            <td>
                            <button onClick={() => handleEdit(docente.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7ed321" fill="none">
                                        <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                    </button>
                                    <button onClick={() => handleDelete(docente.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#d0021b" fill="none">
                                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export { Adocentes, Tabladocentes };
