<template>
  <main id="conteudo">
    <Despesas :despesas="despesas" @despesaAdicionada="despesaAdicionada" />
    <Receitas />
  </main>
</template>

<script>
import Despesas from "./despesas/Despesas";
import Receitas from "./receitas/Receitas";

export default {
  props: {
    despesas: Array
  },
  components: {
    Despesas,
    Receitas
  },
  methods: {
    despesaAdicionada() {
      this.$emit("despesaAdicionada");
    }
  }
};
</script>

<style>
</style>
