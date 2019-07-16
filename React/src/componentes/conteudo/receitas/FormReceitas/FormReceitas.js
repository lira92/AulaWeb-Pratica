import React, { Component } from 'react';
import receitasService from 'services/receitas';

class FormReceitas
  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receita: {
        descricao: '',
        valor: 0,
        data: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
      }
    }
  }

  changeDescricao(event) {
    this.setState({
      receita: {
        ...this.state.receita,
        descricao: event.target.value
      }
    })
  }

  changeValor(event) {
    this.setState({
      receita: {
        ...this.state.receita,
        valor: event.target.value
      }
    })
  }

  async submit(event) {
    event.preventDefault();

    try {
      await receitasService.adicionar(this.state.receita);

      this.setState({
        receita: {
          descricao: '',
          valor: 0,
          categoria: '',
          data: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
        }
      });

      this.props.onReceitaAdicionada();

      alert('Receita salva com sucesso');
    } catch {
      alert('Ocorreu um erro ao salvar a receita');
    }
  }

  render() {
    return (
      <section className="form-container" id="form-receita-container">
        <h4 className="titulo-form">Adicionar receita</h4>
        <form
          onSubmit={(e) => this.submit(e)}
          className="form"
          name="form-receita"
          action="#">
          <div className="linha-form">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              value={this.state.receita.descricao}
              onChange={(e) => this.changeDescricao(e)}
              name="descricao"
              required />
          </div>
          <div className="linha-form">
            <label htmlFor="valor">Valor</label>
            <input
              type="number"
              name="valor"
              value={this.state.receita.valor}
              onChange={(e) => this.changeValor(e)}
              step="0.01"
              required />
          </div>
          <div className="linha-form">
            <button className="btn" type="submit">Adicionar</button>
          </div>
        </form>
      </section>
    );
  }
}

export default FormReceitas;