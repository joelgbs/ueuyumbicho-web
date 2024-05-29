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

    return (
        <div>
            <h2>Tabla de Mensajes</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}  className='table-style'>
                <thead>
                    <tr>
                        <th>ID</th>
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
                            <td>{mensaje.id}</td>
                            <td>{mensaje.consulta}</td>
                            <td>{mensaje.nombre}</td>
                            <td>{mensaje.email}</td>
                            <td>{mensaje.telefono}</td>
                            <td>{mensaje.fecha}</td>
                            <td>{mensaje.visto ? 'Sí' : 'No'}</td>
                            <td>
                                <button onClick={() => handleDelete(mensaje.id)}>Eliminar</button>
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
