/**
 * Essa classe serve para prover de forma genérica acesso aos dados, ela utiliza uma função de setTimeout
 * SOMENTE para intuito de estudo, simulando a comunicação com um servidor, portanto se você for utilizar 
 * localStorage mesmo, não é necessário aguardar resolver uma promise para realizar as operações.
 */
export default class storeGenerica {
  constructor(chave) {
    this.chave = chave;
  }

  listar() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const itens = localStorage.getItem(this.chave);

        if (!itens) {
          resolve([]);
          return;
        }

        resolve(JSON.parse(itens))
      }, 400);
    })
  }

  salvar(items) {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(this.chave, JSON.stringify(items));
        resolve();
      }, 400);
    })
  }

  adicionar(item) {
    return this.listar()
      .then(items => {
        return this.salvar([...items, item]);
      });
  }
}