import React from 'react';
import Despesas from '../despesas/Despesas/Despesas';
import Receitas from '../receitas/Receitas/Receitas';

const Main = (props) => {
  return (
    <main id="conteudo">
      <Despesas despesas={props.despesas} onDespesaAdicionada={props.onDespesaAdicionada}/>
      <Receitas receitas={props.receitas} onReceitaAdicionada={props.onReceitaAdicionada}/>
    </main>
  );
}

export default Main;