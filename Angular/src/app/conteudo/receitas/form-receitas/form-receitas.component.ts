import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReceitasService } from 'src/app/services/receitas.service';

@Component({
  selector: 'app-form-receitas',
  templateUrl: './form-receitas.component.html',
  styleUrls: ['./form-receitas.component.css']
})
export class FormReceitasComponent implements OnInit {
  receita: any;
  @Output() receitaAdicionada = new EventEmitter();
  constructor(private receitasService: ReceitasService) {
    this.receita = {
      descricao: '',
      valor: 0,
      data: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
    };
  }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      await this.receitasService.adicionar(this.receita);

      this.receita = {
        descricao: '',
        valor: 0,
        data: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
      };

      this.receitaAdicionada.emit();

      alert('Receita salva com sucesso');
    } catch {
      alert('Ocorreu um erro ao salvar a receita');
    }
  }
}
