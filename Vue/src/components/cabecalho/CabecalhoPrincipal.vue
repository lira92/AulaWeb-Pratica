<template>
  <section id="cabecalho-principal">
    <div id="container-esquerdo">
      <i class="fas fa-bars"></i>
    </div>
    <div id="container-central">
      <hgroup>
        <h5 class="ofuscado">Saldo atual</h5>
        <h2 id="saldo">{{saldoFormatado}}</h2>
        <h4>
          <button class="btn btn-redondo">
            <i class="fas fa-caret-left"></i>
          </button>
          Maio
          <button class="btn btn-redondo">
            <i class="fas fa-caret-right"></i>
          </button>
        </h4>
      </hgroup>
    </div>
    <div id="container-direito">
      <i class="fas fa-cog"></i>
    </div>
  </section>
</template>

<script>
import formatacoesService from '@/services/formatacoes';

export default {
  props: {
    saldo: Number
  },
  computed: {
    saldoFormatado() {
      return formatacoesService.formatarMoeda(this.saldo);
    }
  }
};
</script>

<style>
</style>
