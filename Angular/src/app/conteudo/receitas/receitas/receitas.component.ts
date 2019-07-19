import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})
export class ReceitasComponent implements OnInit {
  @Input() receitas: Array<any>;
  @Output() receitaAdicionada = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onReceitaAdicionada() {
    this.receitaAdicionada.emit();
  }
}
