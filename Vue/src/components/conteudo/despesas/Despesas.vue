<template>
  <section class="coluna-conteudo" id="despesas">
    <h3>Despesas</h3>
    <TabelaDespesas :despesas="despesas"/>
    <FormDespesas @despesaAdicionada="despesaAdicionada"/>
  </section>
</template>

<script>
import TabelaDespesas from "./TabelaDespesas";
import FormDespesas from "./FormDespesas";

export default {
  props: {
    despesas: Array
  },
  components: {
    TabelaDespesas,
    FormDespesas
  },
  methods: {
    despesaAdicionada() {
      this.$emit('despesaAdicionada');
    }
  }
};
</script>

<style>
</style>
