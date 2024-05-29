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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userTypes = ['administracion', 'estudiantes', 'periodismo'];
            for (const userType of userTypes) {
                const snapshot = await firebase.database().ref(userType).orderByChild('email').equalTo(email).once('value');
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
                                    navigate("/library");
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
                <h2>Login</h2>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPass;
