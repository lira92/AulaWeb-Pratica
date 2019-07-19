import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ptBr);

import { AppComponent } from './app.component';
import { HeaderComponent } from './cabecalho/header/header.component';
import { CabecalhoPrincipalComponent } from './cabecalho/cabecalho-principal/cabecalho-principal.component';
import { CabecalhoConteudoComponent } from './cabecalho/cabecalho-conteudo/cabecalho-conteudo.component';
import { MainComponent } from './conteudo/main/main.component';
import { DespesasComponent } from './conteudo/despesas/despesas/despesas.component';
import { ReceitasComponent } from './conteudo/receitas/receitas/receitas.component';
import { FormDespesasComponent } from './conteudo/despesas/form-despesas/form-despesas.component';
import { TabelaDespesasComponent } from './conteudo/despesas/tabela-despesas/tabela-despesas.component';
import { FormReceitasComponent } from './conteudo/receitas/form-receitas/form-receitas.component';
import { TabelaReceitasComponent } from './conteudo/receitas/tabela-receitas/tabela-receitas.component';
import { GrupoTransacaoComponent } from './compartilhado/grupo-transacao/grupo-transacao.component';
import { ItemVisaoGeralComponent } from './compartilhado/item-visao-geral/item-visao-geral.component';
import { ProgressoCategoriaComponent } from './compartilhado/progresso-categoria/progresso-categoria.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CabecalhoPrincipalComponent,
    CabecalhoConteudoComponent,
    MainComponent,
    DespesasComponent,
    ReceitasComponent,
    FormDespesasComponent,
    TabelaDespesasComponent,
    FormReceitasComponent,
    TabelaReceitasComponent,
    GrupoTransacaoComponent,
    ItemVisaoGeralComponent,
    ProgressoCategoriaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
