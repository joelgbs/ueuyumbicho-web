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
                                <button onClick={() => handleEdit(horario.id)}>Editar</button>
                                <button onClick={() => handleDelete(horario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



export { Ahorarios, Tablahorarios };
