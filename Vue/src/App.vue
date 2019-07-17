<template>
  <div id="app">
    <Header />
    <Main />
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import "./font-montserrat.css";
import Header from "./components/cabecalho/Header";
import Main from "./components/conteudo/Main";

export default {
  name: "app",
  components: {
    Header,
    Main
  }
};
</script>

<style src="./App.css"></style>
