import { useState, useEffect } from 'react'
import React from 'react'
import blogFetch from '../axios/config';
import { Link } from 'react-router-dom';
import "../css/Home.css";

const Home = () => {
  const [client, setclient] = useState([])

  const getclient = async()=>{
    try {
      const response = await blogFetch.get("/client");
      const data = response.data;
      setclient(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getclient();
  }, [])
  
  return (
    <div className='home'>
      <h1>Lista de Client</h1>
      {client.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        client.map((client) => (
          <div className="post" key={client.id}>
            <h2>{client.name}</h2>
            <p>{client.birth}</p>
            <p>{client.phone}</p>
            <p>{client.cpf}</p>
            <p>{client.email}</p>
            <p>{client.address}</p>
            <p>{client.observation}</p>
            <p>{client.id}</p>
            <div className="buttons">
              <Link to={`/client/${client.id}`} className='btn'>
                Editar client
              </Link>
              <Link to={`/client-delete/${client.id}`} className='btn-delete'>
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