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

    const {id} = useParams();
    const getClients =  async()=>{
        try {
          const response = await blogFetch.get(`/client/${id}`);
          console.log("response");
          console.log(response);
          const data = response.data;
          console.log("data");
          console.log(data);
          setName(data.name);
          setBirth(data.birth);
          setPhone(data.phone);
          setCpf(data.cpf);
          setEmail(data.email);
          setAddress(data.address);
          setObservation(data.observation);
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(()=>{
        getClients();
    }, [])  

    const updateClient = async(e)=>{
        e.preventDefault();
        const cpfIsValid = validarCPF(cpf || "");
        
        if(!cpfIsValid){
          mostrarErro("Cpf Inválido");
          esconderErroAposTempo(3);
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
          await blogFetch.put(`/client/${id}`, client)
        } catch (error) {
          console.log("erro no put axios");
          console.log(error);
        }
        navigate("/");
    }
    
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

  return (
    <div>
        <form onSubmit={(e)=>{updateClient(e)}}>
            <h2>Atualização de funcionário</h2>
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