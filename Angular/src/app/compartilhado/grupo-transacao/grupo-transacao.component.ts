import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grupo-transacao',
  templateUrl: './grupo-transacao.component.html',
  styleUrls: ['./grupo-transacao.component.css']
})
export class GrupoTransacaoComponent implements OnInit {
  @Input() grupo: string;
  @Input() transacoes: Array<any>;
  @Input() obterCategoria: (transacao: any) => string;
  constructor() { }

  ngOnInit() {
  }

}
