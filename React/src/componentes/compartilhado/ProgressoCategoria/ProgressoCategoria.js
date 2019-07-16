import React from 'react';
import formatacoesService from 'services/formatacoes';

const ProgressoCategoria = (props) => {
  return (
    <div>
      <h5>
        <span className="ofuscado">{props.categoria.descricao} {formatacoesService.formatarMoeda(props.total)}</span>
      </h5>
      <progress value={props.total} max={props.categoria.previsto}></progress>
    </div>
  );
}

export default ProgressoCategoria;