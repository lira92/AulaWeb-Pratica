<template>
  <header id="cabecalho">
    <CabecalhoPrincipal :saldo="totais.total"/>
    <CabecalhoConteudo :totais="totais"/>
  </header>
</template>

<script>
import CabecalhoPrincipal from "./CabecalhoPrincipal";
import CabecalhoConteudo from "./CabecalhoConteudo";
import resumoTransacoesService from '@/services/resumoTransacoes';

export default {
  props: {
    despesas: Array,
    receitas: Array
  },
  components: {
    CabecalhoPrincipal,
    CabecalhoConteudo
  },
  computed: {
    totais() {
      return resumoTransacoesService.calcularTotais(this.despesas, this.receitas);
    }
  }
};
</script>

<style>
</style>
