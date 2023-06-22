import React from 'react'
import { Link } from 'react-router-dom'
import "../css/NavBar.css";
const NavBar = () => {
  return (
    <nav className="navbar">
        <h2>
            <Link to={`/`}>CRUD</Link>
        </h2>
        <ul>
            <li>
                <Link to={`/`}>Home</Link>
            </li>
            <li>
                <Link to={`/cadastro-client`} className="new-btn">
                    Criar Funcionário
                </Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar