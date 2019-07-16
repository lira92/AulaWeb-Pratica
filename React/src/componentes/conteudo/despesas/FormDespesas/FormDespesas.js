import React, { Component } from 'react';
import configuracoes from 'services/configuracoes';
import despesasService from 'services/despesas';

class FormDespesas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      despesa: {
        descricao: '',
        valor: 0,
        categoria: '',
        data: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
      }
    }
  }

  changeDescricao(event) {
    this.setState({
      despesa: {
        ...this.state.despesa,
        descricao: event.target.value
      }
    })
  }

  changeValor(event) {
    this.setState({
      despesa: {
        ...this.state.despesa,
        valor: event.target.value
      }
    })
  }

  changeCategoria(event) {
    this.setState({
      despesa: {
        ...this.state.despesa,
        categoria: event.target.value
      }
    })
  }

  async submit(event) {
    event.preventDefault();

    try {
      await despesasService.adicionar(this.state.despesa);

      this.setState({
        despesa: {
          descricao: '',
          valor: 0,
          categoria: '',
          data: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
        }
      });

      this.props.onDespesaAdicionada();

      alert('Despesa salva com sucesso');
    } catch {
      alert('Ocorreu um erro ao salvar a despesa');
    }
  }

  render() {
    return (
      <section className="form-container" id="form-despesa-container">
        <h4 className="titulo-form">Adicionar despesa</h4>
        <form
          onSubmit={(e) => this.submit(e)}
          className="form"
          name="form-despesa"
          action="#">
          <div className="linha-form">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              value={this.state.despesa.descricao}
              onChange={(e) => this.changeDescricao(e)}
              name="descricao"
              required />
          </div>
          <div className="linha-form">
            <label htmlFor="valor">Valor</label>
            <input
              type="number"
              name="valor"
              value={this.state.despesa.valor}
              onChange={(e) => this.changeValor(e)}
              step="0.01"
              required />
          </div>
          <div className="linha-form">
            <label htmlFor="categoria">Categoria</label>
            <select
              name="categoria"
              value={this.state.despesa.categoria}
              onChange={(e) => this.changeCategoria(e)}
              required>
              <option value="">Selecione uma categoria</option>
              {
                configuracoes.categorias.map(categoria => (
                  <option value={categoria.identificador} key={categoria.identificador}>{categoria.descricao}</option>
                ))
              }
            </select>
          </div>
          <div className="linha-form">
            <button className="btn" type="submit">Adicionar</button>
          </div>
        </form>
      </section>
    );
  }
}

export default FormDespesas;