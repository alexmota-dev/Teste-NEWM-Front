import React from 'react'
import { Link } from 'react-router-dom';

const ClientsList = ({clients}) => {
  return (
    <div>
        {clients.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        clients.map((client) => (
          <div className='post' key={client.id}>
            <h2>{client.name}</h2>
            <p>{client.birth}</p>
            <p>{client.phone}</p>
            <p>{client.cpf}</p>
            <p>{client.email}</p>
            <p>{client.address}</p>
            <p>{client.observation}</p>
            <p>{client.id}</p>
            <div className='buttons'>
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

export default ClientsList