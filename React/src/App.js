import React, { Component } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './font-montserrat.css';
import Header from './componentes/cabecalho/Header/Header';
import Main from './componentes/conteudo/Main/Main';
import despesasService from 'services/despesas';
import receitasService from 'services/receitas';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      despesas: [],
      receitas: []
    }

    this.listarDespesas();

    this.listarReceitas();
  }

  async listarDespesas() {
    const despesas = await despesasService.listar();
    this.setState({ despesas });
  }

  async listarReceitas() {
    const receitas = await receitasService.listar();
    this.setState({ receitas });
  }

  render() {
    return (
      <div className="App">
        <Header
          despesas={this.state.despesas}
          receitas={this.state.receitas}/>
        <Main
          despesas={this.state.despesas}
          onDespesaAdicionada={() => this.listarDespesas()}
          receitas={this.state.receitas}
          onReceitaAdicionada={() => this.listarReceitas()}/>
      </div>
    );
  }
}

export default App;
