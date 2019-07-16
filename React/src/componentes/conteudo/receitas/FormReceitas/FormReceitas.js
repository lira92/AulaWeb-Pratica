import React from 'react';

const FormReceitas = () => {
  return (
    <section className="form-container" id="form-receita-container">
      <h4 className="titulo-form">Adicionar receita</h4>
      <form id="form-adicionar-receita" className="form" name="form-receita" action="#">
        <div className="linha-form">
          <label htmlFor="descricao">Descrição</label>
          <input type="text" id="descricao" name="descricao" required />
        </div>
        <div className="linha-form">
          <label htmlFor="valor">Valor</label>
          <input type="number" name="valor" id="valor" step="0.01" required />
        </div>
        <div className="linha-form">
          <button className="btn" type="submit">Adicionar</button>
        </div>
      </form>
    </section>
  );
}

export default FormReceitas;