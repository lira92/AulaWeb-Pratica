import React from 'react';
import TabelaReceitas from '../TabelaReceitas/TabelaReceitas';
import FormReceitas from '../FormReceitas/FormReceitas';

const Receitas = () => {
  return (
    <section className="coluna-conteudo" id="receitas">
      <h3>Receitas</h3>
      <TabelaReceitas />
      <FormReceitas />
    </section>
  );
}

export default Receitas;