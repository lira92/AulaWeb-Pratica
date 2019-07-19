import { Component, OnInit, Input } from '@angular/core';
import { ColecoesService } from 'src/app/services/colecoes.service';
import { ConfiguracoesService } from 'src/app/services/configuracoes.service';

@Component({
  selector: 'app-tabela-despesas',
  templateUrl: './tabela-despesas.component.html',
  styleUrls: ['./tabela-despesas.component.css']
})
export class TabelaDespesasComponent implements OnInit {
  @Input() despesas: Array<any>;
  constructor(private colecoesService: ColecoesService, private configuracoes: ConfiguracoesService) {

  }

  ngOnInit() {
  }

  get despesasAgrupadas() {
    if (!this.despesas) {
      return [];
    }
    return this.colecoesService.agrupar(this.despesas, 'data');
  }

  get datasOrdenadas() {
    return Object.keys(this.despesasAgrupadas).sort((a, b) => {
      if (new Date(b) < new Date(a)) {
          return -1;
      }
      if (new Date(b) > new Date(a)) {
          return 1;
      }
      return 0;
    });
  }

  obterCategoria = (despesa: any) => {
    return this.configuracoes.categorias
      .find(categoria => categoria.identificador === despesa.categoria).descricao;
  }
}
