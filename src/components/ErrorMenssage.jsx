import React from 'react';
import "../css/ErrorMessage.css";

const ErrorMessage = ({ message, aoClicarEmFechar }) => {
    return (
        <div className='error-container'>
            <p>{message}</p>
            <button onClick={aoClicarEmFechar}>X</button>
        </div>
    );
}

export default ErrorMessage;
