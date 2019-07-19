import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progresso-categoria',
  templateUrl: './progresso-categoria.component.html',
  styleUrls: ['./progresso-categoria.component.css']
})
export class ProgressoCategoriaComponent implements OnInit {
  @Input() categoria: any;
  @Input() total: number;
  constructor() { }

  ngOnInit() {
    console.log(this.total);
  }

}
