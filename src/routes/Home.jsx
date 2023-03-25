import { useState, useEffect } from 'react'
import React from 'react'
// import axios from "axios";
import blogFetch from '../axios/config';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {

  const [posts, setsPosts] = useState([])

  const getPosts =  async()=>{
    try {
      const response = await blogFetch.get("/api/v1/funcionario");

      const data = response.data;
      setsPosts(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getPosts();
  }, [])
  return (
    <div className='home'>
      <h1>Lista de Funcionarios</h1>
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.nome}</h2>
            <p>{post.nascimento}</p>
            <p>{post.celular}</p>
            <p>{post.cpf}</p>
            <p>{post.email}</p>
            <p>{post.endereco}</p>
            <p>{post.observacao}</p>
            <Link to={`/funcionario/${post.id}`} className='btn'>
              Ler mais
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

export default Home