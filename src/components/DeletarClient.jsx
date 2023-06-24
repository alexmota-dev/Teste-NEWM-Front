import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import { useState } from 'react';
import blogFetch from '../axios/config';

const DeletarClient = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    
    const destroy = async()=>{
      try {
        await blogFetch.delete(`/client/${id}`);
      } catch (error) {
        console.log(error);
      }
      navigate("/");
    }
  
    return (
      <div className='content'>
          <div className="content-page-delete">
              <p>
                  Essa ação removera o funcionário permanentemente, tem certeza que deseja continuar ?
              </p>
              <div className="buttons">
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
      </div>
    )
  }
  
  export default DeletarClient;