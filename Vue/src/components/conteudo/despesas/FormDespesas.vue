<template>
  <section class="form-container" id="form-despesa-container">
    <h4 class="titulo-form">Adicionar despesa</h4>
    <form
      @submit="submit"
      id="form-adicionar-despesa"
      class="form"
      name="form-despesa"
      action="#">
      <div class="linha-form">
        <label for="descricao">Descrição</label>
        <input
          type="text"
          v-model="despesa.descricao"
          name="descricao"
          required />
      </div>
      <div class="linha-form">
        <label for="valor">Valor</label>
        <input
          type="number"
          name="valor"
          v-model="despesa.valor"
          step="0.01"
          required />
      </div>
      <div class="linha-form">
        <label for="categoria">Categoria</label>
        <select
          name="categoria"
          v-model="despesa.categoria"
          required>
          <option value>Selecione uma categoria</option>
          <option
            :key="categoria.identificador"
            :value="categoria.identificador"
            v-for="categoria in categorias">{{categoria.descricao}}</option>
        </select>
      </div>
      <div class="linha-form">
        <button class="btn" type="submit">Adicionar</button>
      </div>
    </form>
  </section>
</template>

<script>
import configuracoes from '@/services/configuracoes';
import despesasService from '@/services/despesas';

export default {
  data() {
    return {
      despesa: {
        descricao: '',
        valor: 0,
        categoria: '',
        data: new Date(new Date().setHours(0,0,0,0)).toISOString()
      },
      categorias: configuracoes.categorias
    }
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      try {
        await despesasService.adicionar(this.despesa);

        this.despesa = {
          descricao: '',
          valor: 0,
          categoria: '',
          data: new Date(new Date().setHours(0,0,0,0)).toISOString()
        };

        alert('Despesa salva com sucesso');
      } catch {
        alert('Ocorreu um erro ao salvar a despesa');
      }
    }
  }
};
</script>

<style>
</style>
