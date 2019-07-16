import React from 'react';
import TabelaReceitas from '../TabelaReceitas/TabelaReceitas';
import FormReceitas from '../FormReceitas/FormReceitas';

const Receitas = (props) => {
  return (
    <section className="coluna-conteudo" id="receitas">
      <h3>Receitas</h3>
      <TabelaReceitas receitas={props.receitas}/>
      <FormReceitas onReceitaAdicionada={props.onReceitaAdicionada}/>
    </section>
  );
}

export default Receitas;