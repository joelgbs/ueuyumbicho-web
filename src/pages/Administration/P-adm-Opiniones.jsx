import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app'; // Importa Firebase v9 compat
import 'firebase/compat/database'; // Importa el módulo de base de datos de Firebase

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

function Aopiniones() {
    const [opiniones, setOpiniones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const opinionesRef = firebase.database().ref('opiniones');
        opinionesRef.on('value', (snapshot) => {
            try {
                const opinionesData = snapshot.val();
                console.log("Datos recibidos:", opinionesData);
                if (opinionesData) {
                    const opinionesArray = Object.entries(opinionesData).map(([id, opinion]) => ({
                        id,
                        nombreUsuario: opinion.nombreUsuario,
                        testimonioUsuario: opinion.testimonioUsuario
                    }));
                    // Invertir el orden de las opiniones
                    setOpiniones(opinionesArray.reverse());
                } else {
                    setOpiniones([]);
                }
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error al procesar los datos:', error);
                setLoading(false);
                setError('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
            }
        }, (error) => {
            console.error('Error al obtener datos de Firebase:', error);
            setLoading(false);
            setError('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
        });

        return () => opinionesRef.off('value');
    }, []);


    const handleEdit = (id) => {
        const confirmEdit = window.confirm("¿Deseas editar esta opinión?");
        if (confirmEdit) {
            console.log(`Editar opinión con ID: ${id}`);
            // Obtener la opinión actual de la base de datos
            firebase.database().ref(`opiniones/${id}`).once('value')
                .then((snapshot) => {
                    const currentOpinion = snapshot.val();
                    if (currentOpinion) {
                        const nuevoTestimonio = prompt("Ingrese el nuevo testimonio:", currentOpinion.testimonioUsuario);
                        if (nuevoTestimonio !== null) {
                            // Actualizar el testimonio en la base de datos
                            return firebase.database().ref(`opiniones/${id}`).update({
                                testimonioUsuario: nuevoTestimonio
                            });
                        }
                    } else {
                        console.error('No se encontró la opinión con el ID proporcionado');
                    }
                })
                .then(() => {
                    console.log("Testimonio editado con éxito");
                })
                .catch((error) => {
                    console.error('Error al editar el testimonio:', error);
                });
        }
    };
    
    
    
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta opinión?");
        if (confirmDelete) {
            console.log(`Eliminar opinión con ID: ${id}`);
            // Implementa la lógica para eliminar la opinión aquí
            firebase.database().ref(`opiniones/${id}`).remove()
                .then(() => {
                    console.log("Opinión eliminada con éxito");
                })
                .catch((error) => {
                    console.error('Error al eliminar la opinión:', error);
                });
        }
    };
    
    return (
        <div className="tabla-opiniones">
            {loading && <p>Cargando datos...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <table className="table-style">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Opinión</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {opiniones.map((opinion) => (
                            <tr key={opinion.id}>
                                <td>{opinion.nombreUsuario}</td>
                                <td>{opinion.testimonioUsuario}</td>
                                <td>
                                    <button onClick={() => handleEdit(opinion.id)}>Editar</button>
                                    <button onClick={() => handleDelete(opinion.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Aopiniones;
