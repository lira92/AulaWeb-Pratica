import React from 'react';
import formatacoesService from 'services/formatacoes';

const ItemVisaoGeral = (props) => {
  return (
    <div className="visao-geral-container">
      <h5><span className="ofuscado">{props.item.descricao}</span></h5>
      <span className="texto-grande">{formatacoesService.formatarMoeda(props.item.valor)}</span>
    </div>
  );
}

export default ItemVisaoGeral;