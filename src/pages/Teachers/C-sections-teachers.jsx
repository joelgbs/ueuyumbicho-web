import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import CardTeacher from './C-card-teacher.jsx';

function SectionTeachers(props) {
    const [teachers, setTeachers] = useState([]);
  
    useEffect(() => {
      const database = firebase.database();
      const teachersRef = database.ref('docentes');
      teachersRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const filteredTeachers = Object.values(data).filter(docente => docente.area === props.area);
          setTeachers(filteredTeachers);
        }
      });
    }, [props.area]);
  
    return (
      <div className={`S-teachers seccion-${props.area}`}>
        {teachers.map((docente) => (
          <CardTeacher
            key={docente.id}
            imagen={docente.image}
            profesion={docente.profesion}
            nombre={docente.nombre}
            area={docente.area}
            descripcion={docente.descripcion}
          />
        ))}
      </div>
    );
}

export default SectionTeachers;
