import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import blogFetch from '../axios/config'
import validarCPF from '../validation/ValidationCpf'
import ErrorMessage from './ErrorMenssage'
import FormatCPF from '../validation/FormatarCpf'

let erroTimeoutId;

const FormularioUpdate = () => {
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

    const {id} = useParams();
    const getClients =  async()=>{
        try {
          var response = await blogFetch.get(`/client/${id}`);
        } catch (error) {
          console.log(error)
        }
        if(response.data.status >= 400){
          showError(response.data.message);
          console.log("O erro que voce viu na tela vem do backend :)");
        }
        else{
          const data = response.data;
          setName(data.name);
          setBirth(data.birth);
          setPhone(data.phone);
          setCpf(data.cpf);
          setEmail(data.email);
          setAddress(data.address);
          setObservation(data.observation);
        }
    }
    useEffect(()=>{
        getClients();
    }, [])  

    const updateClient = async(e)=>{
        e.preventDefault();
        const cpfIsValid = validarCPF(cpf || "");
        
        if(!cpfIsValid){
          showError("CPF Inválido");
          return;
        }
        else{
          setCpf(FormatCPF(cpf));
        }
    
        const client = {
          name,
          birth,
          phone,
          cpf,
          email,
          address,
          observation,
        }

        try {
          var response = await blogFetch.put(`/client/${id}`, client)
        } catch (error) {
          console.log("erro no put axios");
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
    }
    
  function showError(mensagem){
    cancelErrorOmissionAfterTime();

    setErro({
      visivel: true,
      mensagem
    });
  }

  function hideErrorAfterTime(seconds){
    const timeInMilliseconds = seconds * 1000;
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

  return (
    <div>
        <form onSubmit={(e)=>{updateClient(e)}}>
            <h2>Atualização de funcionário</h2>
            {
                erro.visivel && (
                  <ErrorMessage message={erro.mensagem} aoClicarEmFechar={hideError} />
                )
            }

            <div className="form-control">
                <label htmlFor="title">Nome</label>
                <input
                name='nome'
                type="text"
                id='nome'
                value={name}
                onChange={(e)=>{ setName(e.target.value)}}>
                </input>

                <label htmlFor="title">Nascimento</label>
                <input
                name='data'
                type="date"
                id='data'
                value={birth}
                onChange={(e)=>{ setBirth(e.target.value)}}>
                </input>

                <label htmlFor="title">Celular</label>
                <input
                name='celular'
                type="text"
                id='celular'
                value={phone}
                onChange={(e)=>{ setPhone(e.target.value)}}>
                </input>

                <label htmlFor="title">CPF</label>
                <input
                name='cpf'
                type="text"
                id='cpf'
                value={cpf}
                onChange={(e)=>{ setCpf(e.target.value)}}>
                </input>

                <label htmlFor="title">Email</label>
                <input
                name='email'
                type="email"
                id='email'
                value={email}
                onChange={(e)=>{ setEmail(e.target.value)}}>
                </input>

                <label htmlFor="title">Endereço</label>
                <input
                name='endereco'
                type="text"
                id='endereco'
                value={address}
                onChange={(e)=>{ setAddress(e.target.value)}}>
                </input>

                <label htmlFor="text">Observação</label>
                <textarea
                name="observacao"
                id="observacao"
                value={observation}
                cols="100" rows="5"
                onChange={(e)=>{ setObservation(e.target.value)}}>
                </textarea>
                <input
                className="btn"
                type="submit"
                value="Editar" />
            </div>
        </form>
    </div>
  )
}

export default FormularioUpdate