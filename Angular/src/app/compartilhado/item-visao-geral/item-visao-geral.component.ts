import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-visao-geral',
  templateUrl: './item-visao-geral.component.html',
  styleUrls: ['./item-visao-geral.component.css']
})
export class ItemVisaoGeralComponent implements OnInit {
  @Input() item: any;
  constructor() { }

  ngOnInit() {
  }

}
