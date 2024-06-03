import React, { useEffect, useState } from "react";
import ContDesX from './C-contenedor-desplazable-x';
import { getDatabase, ref, onValue } from "firebase/database";

// Inicializar Firebase y obtener la referencia a la base de datos
const db = getDatabase();

function CardProfHome(props) {
    return (
        <div className="cardP-home">
            <img src={props.imagenP} alt="" />
            <h4>{props.cargoP}</h4>
            <p>{props.nombreP}</p>
            <p><strong>{props.areaP}</strong></p>
        </div>
    );
}

// Función para cargar los datos de la tabla "docentes" de la Realtime Database
function ContDesProf() {
    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        const docentesRef = ref(db, 'docentes');
        onValue(docentesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convertir los datos de la tabla en un array
                const docentesArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Invertir el orden del array
                const reversedDocentes = docentesArray.reverse();
                setDocentes(reversedDocentes);
            } else {
                setDocentes([]);
            }
        });
    }, []);

    return (
        <ContDesX>
            {/* Renderizar cada docente utilizando el componente CardProfHome */}
            {docentes.map((docente) => (
                <CardProfHome
                    key={docente.id}
                    imagenP={docente.image}
                    cargoP={docente.profesion}
                    nombreP={docente.nombre}
                    areaP={docente.area}
                />
            ))}
        </ContDesX>
    );
}

export default ContDesProf;
