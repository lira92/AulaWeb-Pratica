import React from 'react';
import TabelaDespesas from '../TabelaDespesas/TabelaDespesas';
import FormDespesas from '../FormDespesas/FormDespesas';

const Despesas = () => {
  return (
    <section className="coluna-conteudo" id="despesas">
      <h3>Despesas</h3>
      <TabelaDespesas />
      <FormDespesas />
    </section>
  );
}

export default Despesas;