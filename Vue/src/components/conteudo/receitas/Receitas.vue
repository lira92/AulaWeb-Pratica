<template>
  <section class="coluna-conteudo" id="receitas">
    <h3>Receitas</h3>
    <TabelaReceitas :receitas="receitas"/>
    <FormReceitas @receitaAdicionada="receitaAdicionada"/>
  </section>
</template>

<script>
import TabelaReceitas from "./TabelaReceitas";
import FormReceitas from "./FormReceitas";

export default {
  props: {
    receitas: Array
  },
  components: {
    TabelaReceitas,
    FormReceitas
  },
  methods: {
    receitaAdicionada() {
      this.$emit("receitaAdicionada");
    }
  }
};
</script>

<style>
</style>
