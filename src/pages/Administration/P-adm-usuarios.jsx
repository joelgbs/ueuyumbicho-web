import firebase from "firebase/compat/app";
import "firebase/compat/database";
import React, { useState } from "react";
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
    const [confirmacion, setConfirmacion] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    // Función para verificar si el correo electrónico ya está registrado
const verificarEmailExistente = async (email) => {
    try {
        const nivel = props.seccionformulario;
        const snapshot = await firebase.database().ref(nivel).orderByChild('email').equalTo(email).once('value');
        return snapshot.exists();
    } catch (error) {
        console.error('Error al verificar el correo electrónico:', error);
        return false;
    }
};


// Función para verificar si el nombre de usuario ya está registrado
const verificarUsernameExistente = async (username) => {
    try {
        const nivel = props.seccionformulario;
        const snapshot = await firebase.database().ref(nivel).orderByChild('username').equalTo(username).once('value');
        return snapshot.exists();
    } catch (error) {
        console.error('Error al verificar el nombre de usuario:', error);
        return false;
    }
};

// Función para verificar si el número de teléfono ya está registrado
const verificarPhoneExistente = async (phone) => {
    try {
        const nivel = props.seccionformulario;
        const snapshot = await firebase.database().ref(nivel).orderByChild('phone').equalTo(phone).once('value');
        return snapshot.exists();
    } catch (error) {
        console.error('Error al verificar el número de teléfono:', error);
        return false;
    }
};

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificar si el email ya está registrado
        const emailExistente = await verificarEmailExistente(email);
        if (emailExistente) {
            alert("El correo electrónico ya está registrado.");
            return;
        }

        // Verificar si el nombre de usuario ya está registrado
        const usernameExistente = await verificarUsernameExistente(username);
        if (usernameExistente) {
            alert("El nombre de usuario ya está registrado.");
            return;
        }

        // Verificar si el número de teléfono ya está registrado
        const phoneExistente = await verificarPhoneExistente(phone);
        if (phoneExistente) {
            alert("El número de teléfono ya está registrado.");
            return;
        }

        const nivel = props.seccionformulario;

        // Guardar datos en Firebase
        firebase.database().ref(nivel).push({
            fullName: fullName,
            email: email,
            phone: phone,
            password: password,
            username: username,
            nivel: nivel,
            estado: true // Por defecto, el estado es activado
        }).then(() => {
            setConfirmacion(true);
            // Limpiar el formulario
            setFullName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setUsername("");

            // Después de 3 segundos, ocultar el mensaje de confirmación
            setTimeout(() => {
                setConfirmacion(false);
            }, 3000);
        }).catch((error) => {
            console.error('Error al registrar usuario:', error);
        });
    };

    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        // Si el valor ingresado no es un número, no lo actualiza
        if (!isNaN(inputValue)) {
            setPhone(inputValue);
        }
    };

    return (
        <div className={`content-us formulario-${props.seccionformulario}`}>
            {confirmacion && (
                <div className="alerta-confirmacion">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7ed321" fill="none">
                        <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Usuario registrado exitosamente.
                </div>
            )}
            <form className="formulario" onSubmit={handleSubmit}>
                <div className="C-box">
                <div className="box-U">
                <label htmlFor="fullName">Nombre completo:</label>
                <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Escribe tu nombre completo" />
                </div>
                <div className="box-U">
                <label htmlFor="username">Crea un usuario:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Escribe tu nombre de usuario" />
                </div>
                </div>
                
                
                <label htmlFor="phone">Número de teléfono:</label>
                <input type="text" id="phone" value={phone} onChange={handlePhoneChange} placeholder="Escribe tu número de teléfono" />
                
                <label htmlFor="email">Correo Electrónico:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Escribe tu correo electrónico" />

                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Escribe tu contraseña" />


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

            const newPassword = prompt("Editar Contraseña", usuarioActual.password);
            if (!newPassword) {
                alert("Por favor, ingresa una Contraseña válida");
                return;
            }
    
            const confirmUpdate = window.confirm("¿Estás seguro de actualizar la información del usuario?");
            if (confirmUpdate) {
                const nivel = props.seccionformulario;
                firebase.database().ref(`${nivel}/${id}`).update({
                    fullName: newFullName,
                    email: newEmail,
                    phone: newPhone,
                    password: newPassword
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
            <h3>Usuarios Registrados:</h3>
            <table className='table-style'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo Electrónico</th>
                        <th>Teléfono</th>
                        <th>Usuario</th>
                        <th>Contraseña</th>
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
                            <td>{usuario.username}</td>
                            <td>{usuario.password}</td>
                            <td>{usuario.nivel}</td>
                            <td>{usuario.estado ? 'Activo' : 'Inactivo'}</td>
                            <td className="td-buttons">
                                <button onClick={() => handleEdit(usuario.id, usuario)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7ed321" fill="none">
                                    <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </button>
                                <button onClick={() => handleDelete(usuario.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#d0021b" fill="none">
                                    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                                </button>
                                <button className="B-estado" onClick={() => handleToggleEstado(usuario.id, usuario.estado)}>
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

