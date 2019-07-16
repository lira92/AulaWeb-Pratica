import accounting from 'accounting';

const padLeft = (numero, quantidade, caracter) => {
  return Array(quantidade-String(numero).length+1).join(caracter||'0')+numero;
}

const formatarData = (data) => {
  let dataFormatada = data;
  if (typeof(data) == 'string') {
      dataFormatada = new Date(data);
  }

  return `${padLeft(dataFormatada.getDate(), 2)}/${padLeft(dataFormatada.getMonth(), 2)}`;
}

const formatarMoeda = valor => accounting.formatMoney(valor, 'R$ ', 2, '.', ',');

export default {
  formatarData ,
  formatarMoeda
}