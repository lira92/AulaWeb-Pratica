import React, { Component } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './font-montserrat.css';
import Header from './componentes/cabecalho/Header/Header';
import Main from './componentes/conteudo/Main/Main';
import despesasService from 'services/despesas';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      despesas: []
    }

    this.listarDespesas();
  }

  async listarDespesas() {
    const despesas = await despesasService.listar();
    this.setState({ despesas });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main
          despesas={this.state.despesas}
          onDespesaAdicionada={() => this.listarDespesas()}/>
      </div>
    );
  }
}

export default App;
