<template>
  <main id="conteudo">
    <Despesas
      :despesas="despesas"
      @despesaAdicionada="despesaAdicionada" />
    <Receitas
      :receitas="receitas"
      @receitaAdicionada="receitaAdicionada"/>
  </main>
</template>

<script>
import Despesas from "./despesas/Despesas";
import Receitas from "./receitas/Receitas";

export default {
  props: {
    despesas: Array,
    receitas: Array
  },
  components: {
    Despesas,
    Receitas
  },
  methods: {
    despesaAdicionada() {
      this.$emit("despesaAdicionada");
    },
    receitaAdicionada() {
      this.$emit("receitaAdicionada");
    }
  }
};
</script>

<style>
</style>
