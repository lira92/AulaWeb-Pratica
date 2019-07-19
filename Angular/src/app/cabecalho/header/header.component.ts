import { Component, OnInit, Input } from '@angular/core';
import { ResumoTransacoesService } from 'src/app/services/resumo-transacoes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() despesas: Array<any>;
  @Input() receitas: Array<any>;
  constructor(private resumoTransacoesService: ResumoTransacoesService) {
  }

  get totais() {
    if (!this.despesas || !this.receitas) {
      return null;
    }
    return this.resumoTransacoesService.calcularTotais(this.despesas, this.receitas);
  }

  ngOnInit() {
  }
}
