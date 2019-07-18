<template>
  <section class="form-container" id="form-receita-container">
    <h4 class="titulo-form">Adicionar receita</h4>
    <form
      @submit="submit"
      id="form-adicionar-receita"
      class="form"
      name="form-receita"
      action="#">
      <div class="linha-form">
        <label for="descricao">Descrição</label>
        <input
          type="text"
          v-model="receita.descricao"
          name="descricao"
          required />
      </div>
      <div class="linha-form">
        <label for="valor">Valor</label>
        <input
          type="number"
          name="valor"
          v-model="receita.valor"
          step="0.01"
          required />
      </div>
      <div class="linha-form">
        <button class="btn" type="submit">Adicionar</button>
      </div>
    </form>
  </section>
</template>

<script>
import receitasService from '@/services/receitas';

export default {
  data() {
    return {
      receita: {
        descricao: '',
        valor: 0,
        data: new Date(new Date().setHours(0,0,0,0)).toISOString()
      }
    }
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      try {
        await receitasService.adicionar(this.receita);

        this.receita = {
          descricao: '',
          valor: 0,
          data: new Date(new Date().setHours(0,0,0,0)).toISOString()
        };

        this.$emit('receitaAdicionada');

        alert('Receita salva com sucesso');
      } catch {
        alert('Ocorreu um erro ao salvar a receita');
      }
    }
  }
};
</script>

<style>
</style>
