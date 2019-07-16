import React from 'react';
import CabecalhoPrincipal from '../CabecalhoPrincipal/CabecalhoPrincipal';
import CabecalhoConteudo from '../CabecalhoConteudo/CabecalhoConteudo';

const Header = () => {
  return (
    <header id="cabecalho">
      <CabecalhoPrincipal />
      <CabecalhoConteudo />
    </header>
  );
}

export default Header;