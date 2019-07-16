import React from 'react';
import formatacoesService from 'services/formatacoes';

const GrupoTransacoes = (props) => {
  return [
    <tr>
      <td className="coluna-data" colspan="2">{formatacoesService.formatarData(props.grupo)}</td>
    </tr>,
    props.transacoes.map(transacao => (
      <tr>
        <td className="coluna-descricao-transacao">
          {transacao.descricao}
          <p className="categoria-label">{props.obterCategoria(transacao)}</p>
        </td>
        <td className="coluna-valor-transacao">{formatacoesService.formatarMoeda(transacao.valor)}</td>
      </tr>
    ))
  ];
}

export default GrupoTransacoes;