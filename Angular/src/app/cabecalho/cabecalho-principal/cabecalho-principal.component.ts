import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cabecalho-principal',
  templateUrl: './cabecalho-principal.component.html',
  styleUrls: ['./cabecalho-principal.component.css']
})
export class CabecalhoPrincipalComponent implements OnInit {
  @Input() saldo: number;
  constructor() { }

  ngOnInit() {
  }

}
