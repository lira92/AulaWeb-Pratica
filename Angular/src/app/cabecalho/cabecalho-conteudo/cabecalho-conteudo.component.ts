import { Component, OnInit, Input } from '@angular/core';
import { ConfiguracoesService } from 'src/app/services/configuracoes.service';

@Component({
  selector: 'app-cabecalho-conteudo',
  templateUrl: './cabecalho-conteudo.component.html',
  styleUrls: ['./cabecalho-conteudo.component.css']
})
export class CabecalhoConteudoComponent implements OnInit {
  @Input() totais: any;
  constructor(private configuracoes: ConfiguracoesService) { }

  ngOnInit() {
  }

  get categoriaReceitas() {
    return {
      identificador: 'receitas',
      descricao: 'Receitas',
      previsto: this.configuracoes.previstoDeReceita
    };
  }

  get categoriaDespesas() {
    const previstoDespesas = this.configuracoes.categorias.reduce(
      (acumulador, categoria) => {
        acumulador += categoria.previsto;
        return acumulador;
      },
      0
    );

    return {
      identificador: 'despesas',
      descricao: 'Despesas',
      previsto: previstoDespesas
    };
  }

  get categorias() {
    return this.configuracoes.categorias;
  }

  totalPorCategoria(categoria: any) {
    return this.totais[categoria.identificador] || 0;
  }
}
