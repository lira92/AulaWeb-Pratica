const calcularTotais = (despesas, receitas) => {
  const totaisDespesas = despesas.reduce((acumulador, despesaAtual) => {
      if (!acumulador.hasOwnProperty(despesaAtual.categoria)) {
          acumulador[despesaAtual.categoria] = 0;
      }

      acumulador[despesaAtual.categoria] += Number.parseFloat(despesaAtual.valor);
      acumulador.despesas += Number.parseFloat(despesaAtual.valor);
      return acumulador;
  }, { despesas: 0 });

  const totalReceita = receitas.reduce((acumulador, receita) => {
      acumulador += Number.parseFloat(receita.valor);
      return acumulador;
  }, 0);

  return {
      ...totaisDespesas,
      receitas: totalReceita,
      total: totalReceita - totaisDespesas.despesas
  };
}

export default {
  calcularTotais
}