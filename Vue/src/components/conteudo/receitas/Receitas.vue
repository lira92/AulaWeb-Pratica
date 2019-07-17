<template>
  <section class="coluna-conteudo" id="receitas">
    <h3>Receitas</h3>
    <TabelaReceitas />
    <FormReceitas />
  </section>
</template>

<script>
import TabelaReceitas from './TabelaReceitas';
import FormReceitas from './FormReceitas';

export default {
  components: {
    TabelaReceitas,
    FormReceitas
  }
};
</script>

<style>
</style>
