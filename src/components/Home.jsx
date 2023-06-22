import { useState, useEffect } from 'react'
import React from 'react'
import blogFetch from '../axios/config';
import { Link } from 'react-router-dom';
import "../css/Home.css";

const Home = () => {
  const [funcionarios, setFuncionarios] = useState([])

  const getFuncionarios = async()=>{
    try {
      const response = await blogFetch.get("/funcionario");
      const data = response.data;
      setFuncionarios(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getFuncionarios();
  }, [])
  
  return (
    <div className='home'>
      <h1>Lista de Funcionarios</h1>
      {funcionarios.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        funcionarios.map((funcionario) => (
          <div className="post" key={funcionario.id}>
            <h2>{funcionario.name}</h2>
            <p>{funcionario.birth}</p>
            <p>{funcionario.phone}</p>
            <p>{funcionario.cpf}</p>
            <p>{funcionario.email}</p>
            <p>{funcionario.address}</p>
            <p>{funcionario.observation}</p>
            <p>{funcionario.id}</p>
            <div className="buttons">
              <Link to={`/funcionario/${funcionario.id}`} className='btn'>
                Editar Funcionario
              </Link>
              <Link to={`/funcionario-delete/${funcionario.id}`} className='btn-delete'>
                Deletar
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Home