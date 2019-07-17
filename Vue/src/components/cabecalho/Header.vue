<template>
  <header id="cabecalho">
    <CabecalhoPrincipal />
    <CabecalhoConteudo />
  </header>
</template>

<script>
import CabecalhoPrincipal from "./CabecalhoPrincipal";
import CabecalhoConteudo from "./CabecalhoConteudo";

export default {
  components: {
    CabecalhoPrincipal,
    CabecalhoConteudo
  }
};
</script>

<style>
</style>
