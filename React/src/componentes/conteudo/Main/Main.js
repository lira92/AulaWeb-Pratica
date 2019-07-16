import React from 'react';
import Despesas from '../despesas/Despesas/Despesas';
import Receitas from '../receitas/Receitas/Receitas';

const Main = () => {
  return (
    <main id="conteudo">
      <Despesas />
      <Receitas />
    </main>
  );
}

export default Main;