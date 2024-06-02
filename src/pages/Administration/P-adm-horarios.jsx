import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // Importa Firebase v9 compat
import 'firebase/compat/database'; // Importa el módulo de base de datos de Firebase
import './css/S-adm-horarios.css';

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

function Ahorarios() {
    const [image, setImage] = useState(null);
    const [selectedCurso, setSelectedCurso] = useState('');
    const [selectedAñoLectivo, setSelectedAñoLectivo] = useState('');

    useEffect(() => {
        // Función para verificar y agregar automáticamente un nuevo año lectivo cada 30 de julio
        const agregarAñoLectivo = () => {
            const fechaActual = new Date();
            const diaActual = fechaActual.getDate();
            const mesActual = fechaActual.getMonth() + 1; // Los meses van de 0 a 11
            const añoActual = fechaActual.getFullYear();

            // Si es 30 de julio y aún no se ha agregado el próximo año lectivo
            if (diaActual === 30 && mesActual === 7 && !existeAñoLectivo(`${añoActual}-${añoActual + 1}`)) {
                const nuevoAñoLectivo = `${añoActual}-${añoActual + 1}`;
                setSelectedAñoLectivo(nuevoAñoLectivo);
            }
        };

        // Verificar cada hora si se debe agregar un nuevo año lectivo
        const intervalo = setInterval(agregarAñoLectivo, 3600000); // Verifica cada hora (3600000 ms)

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(intervalo);
    }, []);

    // Función para verificar si el año lectivo ya existe en las opciones
    const existeAñoLectivo = (año) => {
        // Aquí puedes verificar si el año ya está en la lista de opciones
        // Retorna true si existe, false si no existe
        return false; // Por ahora siempre retornará false, debes implementar la lógica adecuada
    };

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

    const handleButtonClick = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleCursoChange = (e) => {
        setSelectedCurso(e.target.value);
    };

    const handleAñoLectivoChange = (e) => {
        setSelectedAñoLectivo(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Evita la recarga de la página al enviar el formulario

        // Guarda los datos del horario en la base de datos de Firebase
        firebase.database().ref('horarios').push({
            image: image,
            curso: selectedCurso,
            añoLectivo: selectedAñoLectivo
        }).then(() => {
            alert("Horario guardado con éxito");
            // Limpiar el formulario después de enviar con éxito
            setImage(null);
            setSelectedCurso('');
            setSelectedAñoLectivo('');
        }).catch((error) => {
            console.error('Error al guardar el horario en Firebase:', error);
        });
    };

    return (
        <div className='body-horarios'>
            <div className="add-horarios">
            <h2>Agregar Horarios de Clases</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="upload-images">
                    {image && <img src={image} alt="Preview" style={{ maxWidth: '50%', maxHeight: '200px' }} />}
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    <button type="button" style={{ opacity: 1 }} onClick={handleButtonClick}>Subir Imagen</button>
                </div>
                <div className="upload-info">
                    <label htmlFor="curso">Selecciona el curso:</label>
                    <select id="curso" value={selectedCurso} onChange={handleCursoChange}>
                    <option value="opcion vacia">Selecciona una opcion</option>
                        <option value="1ro EGB A">1ro EGB "A"</option>
                             <option value="1ro EGB B">1ro EGB "B"</option>
                          <option value="2do EGB A">2do EGB "A"</option>
                           <option value="2do EGB B">2do EGB "B"</option>
                    <option value="3ro EGB A">3ro EGB "A"</option>
                        <option value="3ro EGB B">3ro EGB "B"</option>
                             <option value="4to EGB A">4to EGB "A"</option>
                             <option value="4to EGB B">4to EGB "B"</option>
                             <option value="5to EGB A">5to EGB "A"</option>
                             <option value="5to EGB B">5to EGB "B"</option>
                             <option value="6to EGB A">6to EGB "A"</option>
                             <option value="6to EGB B">6to EGB "B"</option>
                             <option value="7mo EGB A">7mo EGB "A"</option>
                             <option value="7mo EGB B">7mo EGB "B"</option>
                         <option value="8vo EGB A">8vo EGB "A"</option>
                        <option value="8vo EGB B">8vo EGB "B"</option>
                      <option value="8vo EGB C">8vo EGB "C"</option>
                           <option value="8vo EGB D">8vo EGB "D"</option>
                           <option value="9no EGB A">9no EGB "A"</option>
                            <option value="9no EGB B">9no EGB "B"</option>
                             <option value="9no EGB C">9no EGB "C"</option>
                             <option value="9no EGB D">9no EGB "D"</option>
                             <option value="10mo EGB A">10mo EGB "A"</option>
                            <option value="10mo EGB B">10mo EGB "B"</option>
                            <option value="10mo EGB C">10mo EGB "C"</option>
                           <option value="10mo EGB D">10mo EGB "D"</option>                           
                           <option value="1ro BGU A">1ro BGU "A"</option>
                            <option value="1ro BGU B">1ro BGU "B"</option>
                           <option value="1ro BGU C">1ro BGU "C"</option>
                          <option value="1ro INFO A">1ro INFO "A"</option>
                          <option value="1ro CONTA A">1ro CONTA "A"</option>
                          <option value="2do BGU A">2do BGU "A"</option>
                            <option value="2do BGU B">2do BGU "B"</option>
                             <option value="2do BGU C">2do BGU "C"</option>
                             <option value="2do INFO A">2do INFO "A"</option>
                            <option value="2do CONTA A">2do CONTA "A"</option>
                            <option value="3ro BGU A">3ro BGU "A"</option>
                             <option value="3ro BGU B">3ro BGU "B"</option>
                            <option value="3ro BGU C">3ro BGU "C"</option>
                            <option value="3ro INFO A">3ro INFO "A"</option>
                            <option value="3ro CONTA A">3ro CONTA "A"</option>
                    </select>
                    <label htmlFor="añoLectivo">Año lectivo:</label>
                    <select id="añoLectivo" value={selectedAñoLectivo} onChange={handleAñoLectivoChange}>
                        <option value="">Selecciona una opción</option>
                        <option value="2023-2024">2023 - 2024</option>
                        {/* Más opciones aquí */}
                    </select>
                    <button type="submit">Guardar</button>
                </div>
            </form>
            </div>
        </div>
    );
}

function Tablahorarios() {
    const [horarios, setHorarios] = useState([]);

    useEffect(() => {
        // Obtener los horarios de la base de datos al cargar el componente
        const horariosRef = firebase.database().ref('horarios');
        horariosRef.on('value', (snapshot) => {
            const horariosData = snapshot.val();
            if (horariosData) {
                const horariosArray = Object.entries(horariosData).map(([id, horario]) => ({ id, ...horario }));
                // Invertir el orden de los horarios
                setHorarios(horariosArray.reverse());
            }
        });
        // Detener la escucha al desmontar el componente
        return () => horariosRef.off('value');
    }, []);

    const handleEdit = (id) => {
        const confirmEdit = window.confirm("¿Deseas editar este horario?");
        if (confirmEdit) {
            // Aquí puedes implementar la lógica para editar un horario
            console.log(`Editar horario con ID: ${id}`);
            // Por ejemplo, podrías abrir un modal con las opciones de edición
            const horario = horarios.find((h) => h.id === id);
            if (horario) {
                const newCurso = prompt("Editar Curso", horario.curso);
                const newAñoLectivo = prompt("Editar Año Lectivo", horario.añoLectivo);

                if (newCurso && newAñoLectivo) {
                    firebase.database().ref(`horarios/${id}`).update({
                        curso: newCurso,
                        añoLectivo: newAñoLectivo
                    }).then(() => {
                        console.log("Horario editado con éxito");
                    }).catch((error) => {
                        console.error('Error al editar el horario:', error);
                    });
                }
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
                    firebase.database().ref(`horarios/${id}`).update({ image: imageDataUrl })
                        .then(() => console.log("Imagen actualizada con éxito"))
                        .catch((error) => console.error("Error al actualizar la imagen:", error));
                };
                reader.readAsDataURL(selectedImage);
            }
        };
        input.click();
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este horario?");
        if (confirmDelete) {
            // Aquí puedes implementar la lógica para eliminar un horario
            console.log(`Eliminar horario con ID: ${id}`);
            // Por ejemplo, podrías enviar una solicitud de eliminación a la base de datos
            firebase.database().ref(`horarios/${id}`).remove()
                .then(() => {
                    console.log("Horario eliminado con éxito");
                })
                .catch((error) => {
                    console.error('Error al eliminar el horario:', error);
                });
        }
    };

    return (
        <div className="tabla-horarios">
            <table className='table-style'>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Curso</th>
                        <th>Año Lectivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {horarios.map((horario) => (
                        <tr key={horario.id}>
                            <td>
                                <img src={horario.image} alt="Foto del horario" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                <button onClick={() => handleEditImage(horario.id)}>Editar Imagen</button>
                            </td>
                            <td>{horario.curso}</td>
                            <td>{horario.añoLectivo}</td>
                            <td>
                            <button onClick={() => handleEdit(horario.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7ed321" fill="none">
                                        <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                    </button>
                                    <button onClick={() => handleDelete(horario.id)}>
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



export { Ahorarios, Tablahorarios };
