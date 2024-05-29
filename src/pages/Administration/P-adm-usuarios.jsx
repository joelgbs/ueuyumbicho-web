import React from "react";
import firebase from 'firebase/compat/app'; // Importa Firebase v9 compat
import 'firebase/compat/database'; // Importa el módulo de base de datos de Firebase
import './css/S-adm-usuarios.css';

// Configuración de Firebase
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

// Inicializar Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function AformUsuarios(props) {
    const [confirmacion, setConfirmacion] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const password = formData.get('password');
        const nivel = props.seccionformulario; // nivel de administración

        // Guardar datos en Firebase
        firebase.database().ref(nivel).push({
            fullName: fullName,
            email: email,
            phone: phone,
            password: password,
            nivel: nivel,
            estado: true // Por defecto, el estado es activado
        }).then(() => {
            setConfirmacion(true);
            // Limpiar el formulario
            event.target.reset();
        }).catch((error) => {
            console.error('Error al registrar usuario:', error);
        });
    };

    return (
        <div className={`content-us formulario-${props.seccionformulario}`}>
            {confirmacion && (
                <div className="alerta-confirmacion">
                    Usuario registrado exitosamente.
                </div>
            )}
            <form className="formulario" onSubmit={handleSubmit}>
                <label htmlFor="fullName">Nombre completo:</label>
                <input type="text" id="fullName" name="fullName" placeholder="Escribe tu nombre completo" />

                <label htmlFor="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" placeholder="Escribe tu correo electrónico" />

                <label htmlFor="phone">Número de teléfono:</label>
                <input type="text" id="phone" name="phone" placeholder="Escribe tu número de teléfono" />

                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" placeholder="Escribe tu contraseña" />

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

function AtableUsuarios(props) {
    const [usuarios, setUsuarios] = React.useState([]);

    React.useEffect(() => {
        const nivel = props.seccionformulario;
        // Recuperar datos de Firebase
        firebase.database().ref(nivel).on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const usuariosArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
                // Invertir el orden de los usuarios
                setUsuarios(usuariosArray.reverse());
            }
        });
    }, [props.seccionformulario]);
     
    const handleEdit = (id, usuarioActual) => {
        const confirmEdit = window.confirm("¿Deseas editar este usuario?");
        if (confirmEdit) {
            const newFullName = prompt("Editar Nombre completo", usuarioActual.fullName);
            if (!newFullName) {
                alert("Por favor, ingresa un Nombre válido");
                return;
            }
    
            const newEmail = prompt("Editar Correo Electrónico", usuarioActual.email);
            if (!newEmail) {
                alert("Por favor, ingresa un Correo Electrónico válido");
                return;
            }
    
            const newPhone = prompt("Editar Número de teléfono", usuarioActual.phone);
            if (!newPhone) {
                alert("Por favor, ingresa un Número de teléfono válido");
                return;
            }
    
            const confirmUpdate = window.confirm("¿Estás seguro de actualizar la información del usuario?");
            if (confirmUpdate) {
                const nivel = props.seccionformulario;
                firebase.database().ref(`${nivel}/${id}`).update({
                    fullName: newFullName,
                    email: newEmail,
                    phone: newPhone
                }).then(() => {
                    alert("Usuario editado correctamente");
                }).catch((error) => {
                    alert("Error al editar el usuario: " + error.message);
                });
            } else {
                alert("La edición del usuario ha sido cancelada");
            }
        } else {
            alert("La edición del usuario ha sido cancelada");
        }
    };
    

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmDelete) {
            // Aquí puedes implementar la lógica para eliminar un usuario
            console.log(`Eliminar usuario con ID: ${id}`);
            // Por ejemplo, podrías enviar una solicitud de eliminación a la base de datos
            const nivel = props.seccionformulario;
            firebase.database().ref(`${nivel}/${id}`).remove()
                .then(() => {
                    console.log("Usuario eliminado con éxito");
                })
                .catch((error) => {
                    console.error('Error al eliminar el usuario:', error);
                });
        }
    };

    const handleToggleEstado = (id, estado) => {
        // Cambiar el estado del usuario
        const nivel = props.seccionformulario;
        firebase.database().ref(`${nivel}/${id}`).update({ estado: !estado });
    };

    return (
        <div className={`table-${props.seccionformulario}`}>
            <h2>Usuarios:</h2>
            <table className='table-style'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo Electrónico</th>
                        <th>Teléfono</th>
                        <th>Nivel</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.fullName}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.phone}</td>
                            <td>{usuario.nivel}</td>
                            <td>{usuario.estado ? 'Activo' : 'Inactivo'}</td>
                            <td>
                            <button onClick={() => handleEdit(usuario.id, usuario)}>Editar</button>
                                <button onClick={() => handleDelete(usuario.id)}>Eliminar</button>
                                <button onClick={() => handleToggleEstado(usuario.id, usuario.estado)}>
                                    {usuario.estado ? 'Desactivar' : 'Activar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}



export { AformUsuarios, AtableUsuarios };

