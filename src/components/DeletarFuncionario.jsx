import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import { useState } from 'react';
import blogFetch from '../axios/config';

const DeletarFuncionario = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    
    const destroy = async()=>{
      try {
        await blogFetch.delete(`/funcionario/${id}`);
      } catch (error) {
        console.log(error);
      }
      navigate("/");
    }
  
    return (
      <div>
          <div className="content">
              <p>
                  Essa ação removera o funcionário permanentemente, tem certeza que deseja continuar ?
              </p>
              <button
                onClick={()=>
                {
                    destroy();
                }}
                className='btn-delete'>
                Sim
              </button>
              <button
                className='btn'
                onClick={()=>
                {
                  navigate("/");
                }}>
                Voltar
              </button>
          </div>
      </div>
    )
  }
  
  export default DeletarFuncionario