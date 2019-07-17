<template>
  <main id="conteudo">
    <Despesas />
    <Receitas />
  </main>
</template>

<script>
import Despesas from "./despesas/Despesas";
import Receitas from "./receitas/Receitas";

export default {
  components: {
    Despesas,
    Receitas
  }
};
</script>

<style>
</style>
