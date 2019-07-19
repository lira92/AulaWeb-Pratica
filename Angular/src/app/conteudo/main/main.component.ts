import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() despesas: Array<any>;
  @Output() despesaAdicionada = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onDespesaAdicionada() {
    this.despesaAdicionada.emit();
  }
}
