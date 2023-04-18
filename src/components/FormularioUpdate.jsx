import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import blogFetch from '../axios/config'
import validarCPF from '../validation/ValidationCpf'
import ErrorMessage from './ErrorMenssage'

let erroTimeoutId;

const FormularioUpdate = () => {
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

    const {id} = useParams();
    
    const getFuncionarios =  async()=>{
        try {
          const response = await blogFetch.get(`/funcionario/${id}`);
          const data = response.data;
          setNome(data.nome);
          setNascimento(data.nascimento);
          setCelular(data.celular);
          setCpf(data.cpf);
          setEmail(data.email);
          setEndereco(data.endereco);
          setObservacao(data.observacao);
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(()=>{
        getFuncionarios();
    }, [])  

    const updateFuncionario = async(e)=>{
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

        try {
          await blogFetch.put(`/funcionario/${id}`, funcionario)
        } catch (error) {
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
        <form onSubmit={(e)=>{updateFuncionario(e)}}>
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
                value={nome}
                onChange={(e)=>{ setNome(e.target.value)}}>
                </input>

                <label htmlFor="title">Nascimento</label>
                <input
                name='data'
                type="date"
                id='data'
                value={nascimento}
                onChange={(e)=>{ setNascimento(e.target.value)}}>
                </input>

                <label htmlFor="title">Celular</label>
                <input
                name='celular'
                type="text"
                id='celular'
                value={celular}
                onChange={(e)=>{ setCelular(e.target.value)}}>
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
                value={endereco}
                onChange={(e)=>{ setEndereco(e.target.value)}}>
                </input>

                <label htmlFor="text">Observação</label>
                <textarea
                name="observacao"
                id="observacao"
                value={observacao}
                cols="100" rows="5"
                onChange={(e)=>{ setObservacao(e.target.value)}}>
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