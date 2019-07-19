import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {
  @Input() despesas: Array<any>;
  @Output() despesaAdicionada = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onDespesaAdicionada() {
    this.despesaAdicionada.emit();
  }
}
