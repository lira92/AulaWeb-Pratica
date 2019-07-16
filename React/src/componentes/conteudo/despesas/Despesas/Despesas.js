import React from 'react';
import TabelaDespesas from '../TabelaDespesas/TabelaDespesas';
import FormDespesas from '../FormDespesas/FormDespesas';

const Despesas = (props) => {
  return (
    <section className="coluna-conteudo" id="despesas">
      <h3>Despesas</h3>
      <TabelaDespesas despesas={props.despesas}/>
      <FormDespesas onDespesaAdicionada={props.onDespesaAdicionada}/>
    </section>
  );
}

export default Despesas;