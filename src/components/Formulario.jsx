import React from 'react';
import "./Formulario.css";
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import blogFetch from '../axios/config';
import axios from 'axios';
import ErrorMessage from './ErrorMenssage';

const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g,'');

  if(cpf == '') return false;

  // Elimina CPFs invalidos conhecidos
  if (cpf.length != 11 || 
      cpf == "00000000000" || 
      cpf == "11111111111" || 
      cpf == "22222222222" || 
      cpf == "33333333333" || 
      cpf == "44444444444" || 
      cpf == "55555555555" || 
      cpf == "66666666666" || 
      cpf == "77777777777" || 
      cpf == "88888888888" || 
      cpf == "99999999999")
          return false;

  // Valida 1° digito
  var add = 0;
  for (var i=0; i < 9; i ++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
  var rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
      rev = 0;
  if (rev != parseInt(cpf.charAt(9)))
      return false;
  // Valida 2o digito
  add = 0;
  for (var i = 0; i < 10; i ++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
      rev = 0;
  if (rev != parseInt(cpf.charAt(10)))
      return false;
  return true;
}

let erroTimeoutId;

const Formulario = () => {
  // const navigate = useNavigate();
  const [nome, setNome] = useState();
  const [nascimento, setNascimento] = useState();
  const [celular, setCelular] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] = useState();
  const [endereco, setEndereco] = useState();
  const [observacao, setObservacao] = useState();

  const [erro, setErro] = useState({
    visivel: false,
    mensagem: ""
  });

  const createFuncionario = async(e)=>{
    e.preventDefault();
    const cpfIsValid = validarCPF(cpf || "");
    
    if(!cpfIsValid){
      mostrarErro("Cpf Inválido");
      esconderErroAposTempo(3);
      return;
    }

    const funcionario = {
      nome,
      nascimento,
      celular,
      cpf,
      email,
      endereco,
      observacao,
    }

    console.log(funcionario);
    await blogFetch.post("/funcionario",{
      body: funcionario,
    })
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
      <h2>Formulario de funcionarios</h2>

      {
        erro.visivel && (
          <ErrorMessage message={erro.mensagem} aoClicarEmFechar={esconderErro} />
        )
      }

      <div className="form-control">
        <label htmlFor="title">Nome</label>
        <input
        name='nome'
        type="text"
        id='nome'
        placeholder='Digite seu nome'
        onChange={(e)=>{ setNome(e.target.value)}}>
        </input>

        <label htmlFor="title">Nascimento</label>
        <input
        name='data'
        type="date"
        id='data'
        onChange={(e)=>{ setNascimento(e.target.value)}}>
        </input>

        <label htmlFor="title">Celular</label>
        <input
        name='celular'
        type="text"
        id='celular'
        placeholder='Insira seu numero de celular'
        onChange={(e)=>{ setCelular(e.target.value)}}>
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
        onChange={(e)=>{ setEndereco(e.target.value)}}>
        </input>

        <label htmlFor="text">Observação</label>
        <textarea
        name="observacao"
        id="observacao"
        placeholder='Digite a observação'
        cols="100" rows="5"
        onChange={(e)=>{ setObservacao(e.target.value)}}>
        </textarea>
        <input className="btn" type="submit" value="Criar" />
      </div>
    </form>
  </div>
}

export default Formulario