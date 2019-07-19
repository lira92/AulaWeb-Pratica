import { Component } from '@angular/core';
import { DespesasService } from './services/despesas.service';
import { ReceitasService } from './services/receitas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  despesas: Array<any>;
  receitas: Array<any>;
  constructor(private despesasService: DespesasService, private receitasService: ReceitasService) {
    this.listarDespesas();
    this.listarReceitas();
  }

  async listarDespesas() {
    this.despesas = await this.despesasService.listar();
  }

  async listarReceitas() {
    this.receitas = await this.receitasService.listar();
  }
}
