import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService {

  constructor() { }

  get categorias(): Array<any> {
    return [
      {
        identificador: 'lazer',
        descricao: 'Lazer',
        previsto: 320
      },
      {
        identificador: 'alimentacao',
        descricao: 'Alimentação',
        previsto: 800
      },
      {
        identificador: 'moradia',
        descricao: 'Moradia',
        previsto: 700
      },
      {
        identificador: 'transporte',
        descricao: 'Transporte',
        previsto: 500
      }
    ];
  }

  get previstoDeReceita(): number {
    return 4000;
  }
}
