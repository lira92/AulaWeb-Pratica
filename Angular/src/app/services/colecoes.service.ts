import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColecoesService {

  constructor() { }

  agrupar(items: Array<any>, propriedade: string) {
    return items.reduce((acumulador, item) => {
      (acumulador[item[propriedade]] = acumulador[item[propriedade]] || []).push(item);
      return acumulador;
    }, {});
  }
}
