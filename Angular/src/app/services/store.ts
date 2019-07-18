export class Store {
  chave: string;
  constructor(chave: string) {
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

        resolve(JSON.parse(itens));
      }, 400);
    });
  }

  salvar(items) {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(this.chave, JSON.stringify(items));
        resolve();
      }, 400);
    });
  }

  adicionar(item) {
    return this.listar()
      .then((items: Array<any>) => {
        return this.salvar([...items, item]);
      });
  }
}