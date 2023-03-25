import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css";
const NavBar = () => {
  return (
    <nav className="navbar">
        <h2>
            <Link to={`/funcionario`}>Blog</Link>
        </h2>
        <ul>
            <li>
                <Link to={`/funcionario`}>Home</Link>
            </li>
            <li>
                <Link to={`/funcionario/create`} className="new-btn">
                    Criar Funcionario
                </Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar