<template>
  <div>
    <h5>
      <span
        class="ofuscado"
      >{{categoria.descricao}} {{totalFormatado}}</span>
    </h5>
    <progress :value="total" :max="categoria.previsto"></progress>
  </div>
</template>

<script>
import formatacoesService from '@/services/formatacoes';

export default {
  props: {
    categoria: Object,
    total: Number
  },
  computed: {
    totalFormatado() {
      return formatacoesService.formatarMoeda(this.total);
    }
  }
};
</script>

<style>
</style>
