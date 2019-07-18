<template>
  <section id="cabecalho-conteudo">
    <div id="progresso-principal">
      <ProgressoCategoria
        :categoria="categoriaReceitas"
        :total="totais[categoriaReceitas.identificador]"
      />
      <ProgressoCategoria
        :categoria="categoriaDespesas"
        :total="totais[categoriaDespesas.identificador]"
      />
    </div>
    <div id="progresso-categoria">
      <ProgressoCategoria
        v-for="categoria in categorias"
        :key="categoria.identificador"
        :categoria="categoria"
        :total="totais[categoria.identificador] || 0"
      />
    </div>
    <div id="visao-geral">
      <ItemVisaoGeral :item="{ descricao: 'Receitas', valor: totais.receitas }" />
      <ItemVisaoGeral :item="{ descricao: 'Despesas', valor: totais.despesas }" />
      <ItemVisaoGeral :item="{ descricao: 'Economia', valor: totais.total }" />
    </div>
  </section>
</template>

<script>
import configuracoes from "@/services/configuracoes";
import ProgressoCategoria from "@/components/compartilhado/resumo/ProgressoCategoria";
import ItemVisaoGeral from "@/components/compartilhado/resumo/ItemVisaoGeral";

export default {
  components: {
    ProgressoCategoria,
    ItemVisaoGeral
  },
  props: {
    totais: Object
  },
  computed: {
    categoriaReceitas() {
      return {
        descricao: "Receitas",
        identificador: "receitas",
        previsto: configuracoes.previstoDeReceita
      };
    },
    categoriaDespesas() {
      const previstoDespesas = configuracoes.categorias.reduce(
        (acumulador, categoria) => {
          acumulador += categoria.previsto;
          return acumulador;
        },
        0
      );

      return {
        descricao: "Despesas",
        identificador: "despesas",
        previsto: previstoDespesas
      };
    },
    categorias() {
      return configuracoes.categorias;
    }
  }
};
</script>

<style>
</style>
