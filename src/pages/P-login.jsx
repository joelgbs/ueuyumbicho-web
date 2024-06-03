import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import '../css/S-login.css';
import Logoueu from '../assets/ueu.png';

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

// Inicializa Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Generar un token aleatorio seguro
const generateToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    const length = 32;
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
};

function LoginPass(){
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userTypes = ['administracion', 'estudiantes', 'periodismo'];
            for (const userType of userTypes) {
                let snapshot;
                if (loginId.includes('@')) {
                    // Inicio de sesión por correo electrónico
                    snapshot = await firebase.database().ref(userType).orderByChild('email').equalTo(loginId).once('value');
                } else {
                    // Inicio de sesión por nombre de usuario
                    snapshot = await firebase.database().ref(userType).orderByChild('usuario').equalTo(loginId).once('value');
                }
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userId = Object.keys(userData)[0];
                    const user = userData[userId];
                    if (user.password === password) {
                        if (!user.estado) {
                            alert("¡Tu cuenta está inhabilitada!");
                            return;
                        } else {
                            // Generar token aleatorio
                            const token = generateToken();
                            // Almacenar token en el almacenamiento local del navegador
                            localStorage.setItem('token', token);
                            switch (userType) {
                                case 'administracion':
                                    navigate("/Administracion");
                                    break;
                                case 'estudiantes':
                                    navigate("/libreria");
                                    break;
                                case 'periodismo':
                                    navigate("/Editor");
                                    break;
                                default:
                                    break;
                            }
                            return;
                        }
                    } else {
                        alert("¡Contraseña incorrecta!");
                        return;
                    }
                }
            }
            alert("¡Usuario no encontrado!");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
        }
    };

    return(
        <div className="LoginPass-content">
            <form onSubmit={handleSubmit}>
                <img src={Logoueu} alt="" />
                <h1 className="L-h1">Login</h1>
                <p className="L-p">¡Estamos encantados de verte otra vez! Por favor, ingresa tus credenciales para acceder a tu cuenta.</p>
                <label htmlFor="loginId">Email/Usuario</label>
                <input type="text" id="loginId" value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="Email o Usuario" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
                <button type="submit">Iniciar Sesion</button>
            </form>
        </div>
    );
}

export default LoginPass;
