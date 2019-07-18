import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    TabelaReceitasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
