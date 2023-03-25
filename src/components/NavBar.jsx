import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css";
const NavBar = () => {
  return (
    <nav className="navbar">
        <h2>
            <Link to={`/`}>Teste-Newm</Link>
        </h2>
        <ul>
            <li>
                <Link to={`/`}>Home</Link>
            </li>
            <li>
                <Link to={`/cadastro-funcionario`} className="new-btn">
                    Criar Funcionario
                </Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar