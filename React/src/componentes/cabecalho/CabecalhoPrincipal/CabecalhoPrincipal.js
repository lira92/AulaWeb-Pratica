import React from 'react';
import formatacoesService from 'services/formatacoes';

const CabecalhoPrincipal = (props) => {
  return (
    <section id="cabecalho-principal">
      <div id="container-esquerdo">
        <i className="fas fa-bars"></i>
      </div>
      <div id="container-central">
        <hgroup>
          <h5 className="ofuscado">Saldo atual</h5>
          <h2 id="saldo">{formatacoesService.formatarMoeda(props.saldo)}</h2>
          <h4>
            <button className="btn btn-redondo">
              <i className="fas fa-caret-left"></i>
            </button>
            Maio
            <button className="btn btn-redondo">
              <i className="fas fa-caret-right"></i>
            </button>
          </h4>
        </hgroup>
      </div>
      <div id="container-direito">
        <i className="fas fa-cog"></i>
      </div>
    </section>
  );
}

export default CabecalhoPrincipal;