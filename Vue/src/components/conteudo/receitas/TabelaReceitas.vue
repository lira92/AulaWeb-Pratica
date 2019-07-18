<template>
  <table id="tabela-receitas" class="tabela-transacoes">
    <tbody>
      <GrupoTransacoes
        :grupo="grupo"
        :transacoes="transacoesGrupo(grupo)"
        :key="grupo"
        :obterCategoria="() => 'Receitas'"
        v-for="grupo in datasOrdenadas"
      />
    </tbody>
  </table>
</template>

<script>
import GrupoTransacoes from "@/components/compartilhado/transacoes/GrupoTransacoes";
import colecoesService from "@/services/colecoes";

export default {
  components: {
    GrupoTransacoes
  },
  props: {
    receitas: Array
  },
  computed: {
    receitasAgrupadas() {
      return colecoesService.agrupar(this.receitas, "data");
    },
    datasOrdenadas() {
      return Object.keys(this.receitasAgrupadas).sort((a, b) => {
        if (new Date(b) < new Date(a)) {
          return -1;
        }
        if (new Date(b) > new Date(a)) {
          return 1;
        }
        return 0;
      });
    }
  },
  methods: {
    transacoesGrupo(grupo) {
      return this.receitasAgrupadas[grupo];
    }
  }
};
</script>

<style>
</style>
