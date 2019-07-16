import storeGenerica from './store';

const despesasStore = new storeGenerica('despesas');

const listar = () => despesasStore.listar();

const salvar = items => despesasStore.salvar(items);

const adicionar = item => despesasStore.adicionar(item);

export default {
  listar,
  salvar,
  adicionar
}