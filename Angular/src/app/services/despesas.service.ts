import { Injectable } from '@angular/core';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  store: Store;
  constructor() {
    this.store = new Store('despesas');
  }

  listar() {
    return this.store.listar();
  }

  salvar(items: Array<any>) {
    return this.store.salvar(items);
  }

  adicionar(item: any) {
    return this.store.adicionar(item);
  }
}
