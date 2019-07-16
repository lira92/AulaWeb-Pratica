const agrupar = (items, propriedade) => items.reduce((acumulador, item) => {
  (acumulador[item[propriedade]] = acumulador[item[propriedade]] || []).push(item);
  return acumulador;
}, {});

export default {
  agrupar
}