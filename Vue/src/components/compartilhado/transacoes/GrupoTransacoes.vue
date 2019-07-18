<template>
  <div class="grupo-container">
    <tr key="{props.grupo}">
      <td class="coluna-data" colspan="2">{{dataFormatada}}</td>
    </tr>
    <TransacaoGrupo
      v-for="transacao in transacoes"
      :key="grupo+transacao.descricao"
      :transacao="transacao"
      :obterCategoria="obterCategoria"
    />
  </div>
</template>

<script>
import formatacoesService from "@/services/formatacoes";
import TransacaoGrupo from "./TransacaoGrupo";

export default {
  components: {
    TransacaoGrupo
  },
  props: {
    grupo: String,
    transacoes: Array,
    obterCategoria: Function
  },
  computed: {
    dataFormatada() {
      return formatacoesService.formatarData(this.grupo);
    }
  }
};
</script>

<style scoped>

td {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  color: #4b4b4d;
  font-weight: bold;
}

td.coluna-data {
  border: 0;
  padding-bottom: 0;
}
</style>
