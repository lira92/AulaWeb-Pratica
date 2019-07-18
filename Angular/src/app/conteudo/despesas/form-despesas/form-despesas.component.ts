import { Component, OnInit } from '@angular/core';
import { ConfiguracoesService } from 'src/app/services/configuracoes.service';
import { DespesasService } from 'src/app/services/despesas.service';

@Component({
  selector: 'app-form-despesas',
  templateUrl: './form-despesas.component.html',
  styleUrls: ['./form-despesas.component.css']
})
export class FormDespesasComponent implements OnInit {
  despesa: any;
  constructor(private configuracoes: ConfiguracoesService, private despesasService: DespesasService) {
    this.despesa = {
      descricao: '',
      valor: 0,
      categoria: '',
      data: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
    };
  }

  get categorias() {
    return this.configuracoes.categorias;
  }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      await this.despesasService.adicionar(this.despesa);

      this.despesa = {
        descricao: '',
        valor: 0,
        categoria: '',
        data: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
      };

      alert('Despesa salva com sucesso');
    } catch {
      alert('Ocorreu um erro ao salvar a despesa');
    }
  }
}
