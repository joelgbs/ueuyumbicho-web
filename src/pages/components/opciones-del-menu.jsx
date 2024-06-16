import React from "react";
import '../styles/opciones-del-menu.css';

// Componente Mn
function Mn(props) {
    return (
        <ul className={props.menuClass}>
            {props.children}
        </ul>
    );
}

// Componente MnOption
function MnOption(props) {
    return (
        <li>
            {props.children}
        </li>
    );
}

function MnOptionSubmenu(props){
    return (
        <li>
            <span>
                {props.anchorName}
            </span>
            {props.children}
        </li>
    );
}

// Exportación de los componentes
export { Mn, MnOption, MnOptionSubmenu };
