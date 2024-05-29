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
                                <button onClick={() => handleEdit(docente.id)}>Editar</button>
                                <button onClick={() => handleDelete(docente.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export { Adocentes, Tabladocentes };
