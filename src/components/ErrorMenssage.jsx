import React from 'react';
import "../css/ErrorMessage.css";

const ErrorMessage = ({ message, whenYouClickClose }) => {
    return (
        <div className='error-container'>
            <p>{message}</p>
            <button onClick={whenYouClickClose}>X</button>
        </div>
    );
}

export default ErrorMessage;
