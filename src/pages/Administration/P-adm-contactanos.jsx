import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // Importa Firebase v9 compat
import 'firebase/compat/database'; // Importa el módulo de base de datos de Firebase

const MensajesTable = () => {
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        // Suscribirse a cambios en Firebase
        const mensajesRef = firebase.database().ref('mensajes');
        mensajesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const mensajesArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
                // Invertir el orden de los mensajes
                setMensajes(mensajesArray.reverse());
            }
        });

        // Limpiar el listener al desmontar el componente
        return () => mensajesRef.off();
    }, []);

    const handleDelete = (id) => {
        // Lógica para eliminar el mensaje
        firebase.database().ref(`mensajes/${id}`).remove()
            .then(() => {
                console.log("Mensaje eliminado con éxito");
            })
            .catch((error) => {
                console.error('Error al eliminar el mensaje:', error);
            });
    };

    const handleMarkAsRead = (id) => {
        // Lógica para marcar el mensaje como leído
        firebase.database().ref(`mensajes/${id}`).update({ visto: true })
            .then(() => {
                console.log("Mensaje marcado como leído con éxito");
            })
            .catch((error) => {
                console.error('Error al marcar el mensaje como leído:', error);
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Utiliza el método toLocaleString() para formatear la fecha
    };

    return (
        <div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}  className='table-style'>
                <thead>
                    <tr>
                        <th>Consulta</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Fecha</th>
                        <th>Visto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mensajes.map((mensaje) => (
                        <tr key={mensaje.id} style={{ backgroundColor: mensaje.visto ? 'white' : '#D6EAF8' }}>
                            <td>{mensaje.consulta}</td>
                            <td>{mensaje.nombre}</td>
                            <td>{mensaje.email}</td>
                            <td>{mensaje.telefono}</td>
                            <td>{formatDate(mensaje.fecha)}</td> {/* Utiliza la función formatDate para formatear la fecha */}
                            <td>{mensaje.visto ? 'Sí' : 'No'}</td>
                            <td>
                                <button onClick={() => handleDelete(mensaje.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#d0021b" fill="none">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#d0021b" fill="none">
                                    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                                    </svg>
                                </button>
                                {!mensaje.visto && (
                                    <button onClick={() => handleMarkAsRead(mensaje.id)}>Marcar como leído</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MensajesTable;
