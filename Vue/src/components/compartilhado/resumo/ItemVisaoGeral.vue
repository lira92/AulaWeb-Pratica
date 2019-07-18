<template>
  <div class="visao-geral-container">
    <h5>
      <span class="ofuscado">{{item.descricao}}</span>
    </h5>
    <span class="texto-grande">{{valorFormatado}}</span>
  </div>
</template>

<script>
import formatacoesService from '@/services/formatacoes';

export default {
  props: {
    item: Object
  },
  computed: {
    valorFormatado() {
      return formatacoesService.formatarMoeda(this.item.valor);
    }
  }
};
</script>

<style>
</style>
