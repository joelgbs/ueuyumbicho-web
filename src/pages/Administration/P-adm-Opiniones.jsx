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
            <h2>Opiniones/Testimonios</h2>
            {loading && <p>Cargando datos...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <table className="table-style">
                    {/* <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Opinión</th>
                            <th>Acciones</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {opiniones.map((opinion) => (
                            <tr key={opinion.id}>
                                <td>{opinion.nombreUsuario}</td>
                                <td>{opinion.testimonioUsuario}</td>
                                <td>
                                    <button onClick={() => handleEdit(opinion.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7ed321" fill="none">
                                        <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                    </button>
                                    <button onClick={() => handleDelete(opinion.id)}>
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
            )}
        </div>
    );
}

export default Aopiniones;
