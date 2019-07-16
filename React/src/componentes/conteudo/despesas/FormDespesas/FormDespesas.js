import React from 'react';

const FormDespesas = () => {
  return (
    <section className="form-container" id="form-despesa-container">
      <h4 className="titulo-form">Adicionar despesa</h4>
      <form id="form-adicionar-despesa" className="form" name="form-despesa" action="#">
        <div className="linha-form">
          <label htmlFor="descricao">Descrição</label>
          <input type="text" id="descricao" name="descricao" required />
        </div>
        <div className="linha-form">
          <label htmlFor="valor">Valor</label>
          <input type="number" name="valor" id="valor" step="0.01" required />
        </div>
        <div className="linha-form">
          <label htmlFor="categoria">Categoria</label>
          <select name="categoria" id="categoria" required>
            <option value="">Selecione uma categoria</option>
          </select>
        </div>
        <div className="linha-form">
          <button className="btn" type="submit">Adicionar</button>
        </div>
      </form>
    </section>
  );
}

export default FormDespesas;