import React from 'react';
import "../css/Formulario.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogFetch from '../axios/config';
import ErrorMessage from '../components/ErrorMenssage';
import validarCPF from '../validation/ValidationCpf';

let erroTimeoutId;

const Formulario = () => {
  const navigate = useNavigate();
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

    await blogFetch.post("/funcionario", funcionario);
    console.log(response);
    navigate("/")
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