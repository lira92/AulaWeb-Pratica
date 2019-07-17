<template>
  <section class="coluna-conteudo" id="despesas">
    <h3>Despesas</h3>
    <TabelaDespesas />
    <FormDespesas />
  </section>
</template>

<script>
import TabelaDespesas from './TabelaDespesas';
import FormDespesas from './FormDespesas';

export default {
  components: {
    TabelaDespesas,
    FormDespesas
  }
};
</script>

<style>
</style>
