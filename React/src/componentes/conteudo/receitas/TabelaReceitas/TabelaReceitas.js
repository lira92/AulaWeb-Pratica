import React from 'react';
import colecoesService from 'services/colecoes';
import GrupoTransacoes from 'componentes/compartilhado/GrupoTransacoes/GrupoTransacoes';

const agruparReceitas = receitas => colecoesService.agrupar(receitas, 'data');

const obterDatasOrdenadas = receitasAgrupadas => {
  return Object.keys(receitasAgrupadas)
    .sort((a, b) => {
      if (new Date(b) < new Date(a)) {
          return -1;
      }
      if (new Date(b) > new Date(a)) {
          return 1;
      }
      return 0;
  });
}

const TabelaReceitas = (props) => {
  const receitasAgrupadas = agruparReceitas(props.receitas);
  return (
    <table id="tabela-receitas" className="tabela-transacoes">
      <tbody>
        {
          obterDatasOrdenadas(receitasAgrupadas).map(grupo => (
            <GrupoTransacoes
              key={grupo}
              grupo={grupo}
              transacoes={receitasAgrupadas[grupo]}
              obterCategoria={() => 'Receitas'}/>
          ))
        }
      </tbody>
    </table>
  );
}

export default TabelaReceitas;