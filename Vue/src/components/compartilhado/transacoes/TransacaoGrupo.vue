<template>
  <tr>
    <td class="coluna-descricao-transacao">
      {{transacao.descricao}}
      <p class="categoria-label">{{categoria}}</p>
    </td>
    <td class="coluna-valor-transacao">{{valorFormatado}}</td>
  </tr>
</template>

<script>
import formatacoesService from "@/services/formatacoes";

export default {
  props: {
    transacao: Object,
    obterCategoria: Function
  },
  computed: {
    valorFormatado() {
      return formatacoesService.formatarMoeda(this.transacao.valor);
    },
    categoria() {
      return this.obterCategoria(this.transacao);
    }
  }
};
</script>

<style scoped>
tr {
  width: 100%;
  display: table;
}

td {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  color: #4b4b4d;
  font-weight: bold;
}

td.coluna-descricao-transacao {
  padding-left: 30px;
}

td.coluna-descricao-transacao p {
  font-size: 0.7em;
  opacity: 0.8;
  margin-top: 3px;
}

td.coluna-valor-transacao {
  text-align: right;
}
</style>
