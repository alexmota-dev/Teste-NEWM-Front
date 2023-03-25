import React from 'react';
import "./Formulario.css";



const Formulario = () => {
  return <div className="cadastro-funcionario">
    <form>
      <h2>Formulario de funcionarios</h2>
      <div className="form-control">
        <label htmlFor="title">Nome</label>
        <input name='nome' type="text" id='nome' placeholder='Digite seu nome'></input>

        <label htmlFor="title">Nascimento</label>
        <input name='data' type="date" id='data'></input>

        <label htmlFor="title">Celular</label>
        <input name='celular' type="text" id='celular' placeholder='Insira seu numero de celular'></input>

        <label htmlFor="title">CPF</label>
        <input name='cpf' type="text" id='cpf' placeholder='Insira seu cpf'></input>

        <label htmlFor="title">Email</label>
        <input name='email' type="email" id='email' placeholder='Insira seu email'></input>

        <label htmlFor="title">Endereço</label>
        <input name='endereco' type="text" id='endereco' placeholder='Insira seu endereco'></input>

        <label htmlFor="text">Observação</label>
        <textarea name="observacao" id="observacao" placeholder='Digite a observação' cols="100" rows="5"></textarea>
        <input class="btn" type="submit" value="Criar" />
      </div>
    </form>
  </div>
}

export default Formulario