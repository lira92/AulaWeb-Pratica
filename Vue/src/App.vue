<template>
  <div id="app">
    <Header
      :despesas="despesas"
      :receitas="receitas"/>
    <Main
      :despesas="despesas"
      @despesaAdicionada="listarDespesas()"
      :receitas="receitas"
      @receitaAdicionada="listarReceitas()"/>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import "./font-montserrat.css";
import Header from "./components/cabecalho/Header";
import Main from "./components/conteudo/Main";
import despesasService from "@/services/despesas";
import receitasService from "@/services/receitas";

export default {
  name: "app",
  components: {
    Header,
    Main
  },
  data() {
    return {
      despesas: [],
      receitas: []
    };
  },
  created() {
    this.listarDespesas();
    this.listarReceitas();
  },
  methods: {
    async listarDespesas() {
      this.despesas = await despesasService.listar();
    },
    async listarReceitas() {
      this.receitas = await receitasService.listar();
    }
  }
};
</script>

<style src="./App.css"></style>
