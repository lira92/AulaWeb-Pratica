import React from 'react';
import CabecalhoPrincipal from '../CabecalhoPrincipal/CabecalhoPrincipal';
import CabecalhoConteudo from '../CabecalhoConteudo/CabecalhoConteudo';
import resumoTransacoesService from 'services/resumoTransacoes';

const Header = (props) => {
  const totais = resumoTransacoesService.calcularTotais(props.despesas, props.receitas);
  return (
    <header id="cabecalho">
      <CabecalhoPrincipal saldo={totais.total}/>
      <CabecalhoConteudo totais={totais}/>
    </header>
  );
}

export default Header;