import React from 'react';
import "../css/Formulario.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogFetch from '../axios/config';
import ErrorMessage from '../components/ErrorMenssage';
import validarCPF from '../validation/ValidationCpf.js';
import formatarCPF from '../validation/FormatarCpf';
import verifyName from '../validation/FormatName';

let erroTimeoutId;

const Formulario = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [observation, setObservation] = useState("");

  const [erro, setErro] = useState({
    visivel: false,
    mensagem: ""
  });

  const createClient = async(e)=>{
    e.preventDefault();
    if(name == "" || birth == "" || phone == "" || cpf == "" || email == "" || address == ""){
      showError("O único campo que pode ser vazio é o de observação !");
      hideErrorAfterTime(4);
      return;
    }

    const cpfIsValid = validarCPF(cpf || "");
    if(!cpfIsValid){
      showError("CPF Inválido !");
      hideErrorAfterTime(3);
      return;
    }

    const nameIsValid = verifyName(name || "");
    if(!nameIsValid){
      showError("Nome Inválido !");
      hideErrorAfterTime(3);
      return;
    }
    setCpf(formatarCPF(cpf));


    const client = {
      name,
      birth,
      phone,
      cpf,
      email,
      address,
      observation,
    }
    try{
      var response = await blogFetch.post("/client", client);
    }
    catch(error){
      console.log(error);
    }
    if(response.data.status >= 400){
      showError(response.data.message);
      hideErrorAfterTime(3);
      console.log("O erro que voce viu na tela vem do backend :)");
    }
    else{
      navigate("/");
    }
  };

  function showError(mensagem){
    cancelErrorOmissionAfterTime();

    setErro({
      visivel: true,
      mensagem
    });
  }

  function hideErrorAfterTime(tempoEmSegundos){
    const timeInMilliseconds = tempoEmSegundos * 1000;
    setTimeout(() => {
      hideError();
    }, timeInMilliseconds);
  }

  function hideError(){
    cancelErrorOmissionAfterTime();

    setErro({
      visivel: false,
      mensagem: ""
    });
  }

  function cancelErrorOmissionAfterTime(){
    clearTimeout(erroTimeoutId);
  }

  return <div className="cadastro-client">
    <form onSubmit={(e)=>{createClient(e)}}>
      <h2>Formulario de Clientes</h2>

      {
        erro.visivel && (
          <ErrorMessage message={erro.mensagem} whenYouClickClose={hideError} />
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