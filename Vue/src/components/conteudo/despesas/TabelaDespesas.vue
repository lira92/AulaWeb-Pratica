<template>
  <table id="tabela-despesas" class="tabela-transacoes">
    <tbody>
      <GrupoTransacoes
        :grupo="grupo"
        :transacoes="transacoesGrupo(grupo)"
        :key="grupo"
        :obterCategoria="obterCategoria"
        v-for="grupo in datasOrdenadas"
      />
    </tbody>
  </table>
</template>

<script>
import GrupoTransacoes from "@/components/compartilhado/transacoes/GrupoTransacoes";
import colecoesService from "@/services/colecoes";
import configuracoes from "@/services/configuracoes";

export default {
  components: {
    GrupoTransacoes
  },
  props: {
    despesas: Array
  },
  computed: {
    despesasAgrupadas() {
      return colecoesService.agrupar(this.despesas, "data");
    },
    datasOrdenadas() {
      return Object.keys(this.despesasAgrupadas).sort((a, b) => {
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
      return this.despesasAgrupadas[grupo];
    },
    obterCategoria(despesa) {
      return configuracoes.categorias.find(
        categoria => categoria.identificador === despesa.categoria
      ).descricao;
    }
  }
};
</script>

<style>
</style>
