import React from 'react';
import ProgressoCategoria from 'componentes/compartilhado/ProgressoCategoria/ProgressoCategoria';
import configuracoes from 'services/configuracoes';
import ItemVisaoGeral from 'componentes/compartilhado/ItemVisalGeral/ItemVisaoGeral';

const criarCategoriaReceitas = () => {
  return {
    descricao: 'Receitas',
    identificador: 'receitas',
    previsto: configuracoes.previstoDeReceita
  };
}

const criarCategoriaDespesas = () => {
  const previstoDespesas = configuracoes.categorias.reduce((acumulador, categoria) => {
    acumulador += categoria.previsto;
    return acumulador;
  }, 0)

  return {
    descricao: 'Despesas',
    identificador: 'despesas',
    previsto: previstoDespesas
  };
}

const CabecalhoConteudo = (props) => {
  const categoriaReceita = criarCategoriaReceitas();
  const categoriaDespesa = criarCategoriaDespesas();
  return (
    <section id="cabecalho-conteudo">
      <div id="progresso-principal">
        <ProgressoCategoria
          categoria={categoriaReceita}
          total={props.totais[categoriaReceita.identificador]}/>
        <ProgressoCategoria
          categoria={categoriaDespesa}
          total={props.totais[categoriaDespesa.identificador]}/>
      </div>
      <div id="progresso-categoria">
        {
          configuracoes.categorias.map(categoria => (
            <ProgressoCategoria
              categoria={categoria}
              total={props.totais[categoria.identificador] || 0}/>
          ))
        }
      </div>
      <div id="visao-geral">
        <ItemVisaoGeral item={{ descricao: 'Receitas', valor: props.totais.receitas}}/>
        <ItemVisaoGeral item={{ descricao: 'Despesas', valor: props.totais.despesas}}/>
        <ItemVisaoGeral item={{ descricao: 'Economia', valor: props.totais.total}}/>
      </div>
    </section>
  );
}

export default CabecalhoConteudo;