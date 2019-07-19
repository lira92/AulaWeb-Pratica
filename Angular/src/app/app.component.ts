import { Component } from '@angular/core';
import { DespesasService } from './services/despesas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  despesas: Array<any>;
  constructor(private despesasService: DespesasService) {
    this.listarDespesas();
  }

  async listarDespesas() {
    this.despesas = await this.despesasService.listar();
  }
}
