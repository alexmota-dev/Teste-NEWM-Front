import React from 'react';
import "../css/Formulario.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogFetch from '../axios/config';
import ErrorMessage from '../components/ErrorMenssage';
import validarCPF from '../validation/ValidationCpf.js';
import formatarCPF from '../validation/FormatarCpf';

let erroTimeoutId;

const Formulario = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [birth, setBirth] = useState();
  const [phone, setPhone] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [observation, setObservation] = useState();

  const [erro, setErro] = useState({
    visivel: false,
    mensagem: ""
  });

  const createFuncionario = async(e)=>{
    e.preventDefault();
    setCpf(formatarCPF(cpf));
    const cpfIsValid = validarCPF(cpf || "");
    
    if(!cpfIsValid){
      mostrarErro("Cpf Inválido");
      esconderErroAposTempo(3);
      return;
    }

    const funcionario = {
      name,
      birth,
      phone,
      cpf,
      email,
      address,
      observation,
    }
    try{
      await blogFetch.post("/funcionario", funcionario);
    }
    catch(error){
      console.log(error);
    }
    navigate("/");
  };

  function mostrarErro(mensagem){
    cancelarOmissaoDeErroAposTempo();

    setErro({
      visivel: true,
      mensagem
    });
  }

  function esconderErroAposTempo(tempoEmSegundos){
    const tempoEmMillesgundos = tempoEmSegundos * 1000;
    setTimeout(() => {
      esconderErro();
    }, tempoEmMillesgundos);
  }

  function esconderErro(){
    cancelarOmissaoDeErroAposTempo();

    setErro({
      visivel: false,
      mensagem: ""
    });
  }

  function cancelarOmissaoDeErroAposTempo(){
    clearTimeout(erroTimeoutId);
  }

  return <div className="cadastro-funcionario">
    <form onSubmit={(e)=>{createFuncionario(e)}}>
      <h2>Formulario de funcionários</h2>

      {
        erro.visivel && (
          <ErrorMessage message={erro.mensagem} aoClicarEmFechar={esconderErro} />
        )
      }

      <div className="form-control">
        <label htmlFor="title">Nome</label>
        <input
        name='name'
        type="text"
        id='name'
        placeholder='Digite seu nome'
        onChange={(e)=>{ setName(e.target.value)}}>
        </input>

        <label htmlFor="title">Nascimento</label>
        <input
        name='data'
        type="date"
        id='data'
        onChange={(e)=>{ setBirth(e.target.value)}}>
        </input>

        <label htmlFor="title">Celular</label>
        <input
        name='celular'
        type="text"
        id='celular'
        placeholder='Insira seu numero de celular'
        onChange={(e)=>{ setPhone(e.target.value)}}>
        </input>

        <label htmlFor="title">CPF</label>
        <input
        name='cpf'
        type="text"
        id='cpf'
        placeholder='Insira seu cpf'
        onChange={(e)=>{ setCpf(e.target.value)}}>
        </input>

        <label htmlFor="title">Email</label>
        <input
        name='email'
        type="email"
        id='email'
        placeholder='Insira seu email'
        onChange={(e)=>{ setEmail(e.target.value)}}>
        </input>

        <label htmlFor="title">Endereço</label>
        <input
        name='endereco'
        type="text"
        id='endereco'
        placeholder='Insira seu endereco'
        onChange={(e)=>{ setAddress(e.target.value)}}>
        </input>

        <label htmlFor="text">Observação</label>
        <textarea
        name="observacao"
        id="observacao"
        placeholder='Digite a observação'
        cols="100" rows="5"
        onChange={(e)=>{ setObservation(e.target.value)}}>
        </textarea>
        <input className="btn" type="submit" value="Criar" />
      </div>
    </form>
  </div>
}

export default Formulario