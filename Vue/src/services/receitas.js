import storeGenerica from './store';

const despesasStore = new storeGenerica('receitas');

const listar = () => despesasStore.listar();

const salvar = items => despesasStore.salvar(items);

const adicionar = item => despesasStore.adicionar(item);

export default {
  listar,
  salvar,
  adicionar
}