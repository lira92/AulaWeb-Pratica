import { Component, OnInit, Input } from '@angular/core';
import { ColecoesService } from 'src/app/services/colecoes.service';

@Component({
  selector: 'app-tabela-receitas',
  templateUrl: './tabela-receitas.component.html',
  styleUrls: ['./tabela-receitas.component.css']
})
export class TabelaReceitasComponent implements OnInit {
  @Input() receitas: Array<any>;
  constructor(private colecoesService: ColecoesService) { }

  ngOnInit() {
  }

  get receitasAgrupadas() {
    if (!this.receitas) {
      return [];
    }
    return this.colecoesService.agrupar(this.receitas, 'data');
  }

  get datasOrdenadas() {
    return Object.keys(this.receitasAgrupadas).sort((a, b) => {
      if (new Date(b) < new Date(a)) {
          return -1;
      }
      if (new Date(b) > new Date(a)) {
          return 1;
      }
      return 0;
    });
  }

  obterCategoria(): string {
    return 'Receitas';
  }
}
