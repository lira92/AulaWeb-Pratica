import React from 'react';
import colecoesService from 'services/colecoes';
import configuracoes from 'services/configuracoes';
import GrupoTransacoes from 'componentes/compartilhado/GrupoTransacoes/GrupoTransacoes';

const agruparDespesas = despesas => colecoesService.agrupar(despesas, 'data');

const obterDatasOrdenadas = despesasAgrupadas => {
  return Object.keys(despesasAgrupadas)
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

const obterCategoria = despesa => {
  return configuracoes.categorias.find(categoria => categoria.identificador === despesa.categoria).descricao;
}

const TabelaDespesas = (props) => {
  const despesasAgrupadas = agruparDespesas(props.despesas);
  return (
    <table id="tabela-despesas" className="tabela-transacoes">
      <tbody>
        {
          obterDatasOrdenadas(despesasAgrupadas).map(grupo => (
            <GrupoTransacoes key={grupo} grupo={grupo} transacoes={despesasAgrupadas[grupo]} obterCategoria={obterCategoria}/>
          ))
        }
      </tbody>
    </table>
  );
}

export default TabelaDespesas;