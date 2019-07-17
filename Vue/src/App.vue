<template>
  <div id="app">
    <Header />
    <Main :despesas="despesas" @despesaAdicionada="listarDespesas()"/>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import "./font-montserrat.css";
import Header from "./components/cabecalho/Header";
import Main from "./components/conteudo/Main";
import despesasService from "@/services/despesas";

export default {
  name: "app",
  components: {
    Header,
    Main
  },
  data() {
    return {
      despesas: []
    };
  },
  created() {
    this.listarDespesas();
  },
  methods: {
    async listarDespesas() {
      this.despesas = await despesasService.listar();
    }
  }
};
</script>

<style src="./App.css"></style>
