import { useState, useEffect } from 'react'
import React from 'react'
import blogFetch from '../axios/config';
import '../css/Home.css';
import ClientsList from './ClientsList';

const Home = () => {
  const [clients, setclients] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);


  const getclient = async()=>{
    try {
      const response = await blogFetch.get('/client');
      const data = response.data;
      setclients(data);
    } catch (error) {
      console.log(error)
    }
  }
  const searchClients = (e) => {
    e.preventDefault();
  
    const filteredClients = clients.filter((client) =>
      client.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredClients(filteredClients);
  };
  
  useEffect(()=>{
    getclient();
  }, [])
  
  return (
    <div className='home'>
      <h1>Lista de Client</h1>
      <div>
        <form className='searchBar' onSubmit={searchClients}>
        <input
          name="search"
          className="searchInput"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
          <input className="btn" type="submit" value="Pesquisar" />
        </form>
      </div>
      {filteredClients.length === 0 ? (
        clients.length === 0 ? (
          <h1>Ainda não existem clientes no banco, faça um primeiro cadastro <a href="/cadastro-client">aqui</a></h1>
        ):(
          <ClientsList clients={clients} />
        )):(
          <ClientsList clients={filteredClients} />
        )}
    </div>
  )
}

export default Home;