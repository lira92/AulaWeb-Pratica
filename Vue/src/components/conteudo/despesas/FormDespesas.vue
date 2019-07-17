<template>
  <section class="form-container" id="form-despesa-container">
    <h4 class="titulo-form">Adicionar despesa</h4>
    <form id="form-adicionar-despesa" class="form" name="form-despesa" action="#">
      <div class="linha-form">
        <label for="descricao">Descrição</label>
        <input type="text" id="descricao" name="descricao" required />
      </div>
      <div class="linha-form">
        <label for="valor">Valor</label>
        <input type="number" name="valor" id="valor" step="0.01" required />
      </div>
      <div class="linha-form">
        <label for="categoria">Categoria</label>
        <select name="categoria" id="categoria" required>
          <option value>Selecione uma categoria</option>
        </select>
      </div>
      <div class="linha-form">
        <button class="btn" type="submit">Adicionar</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>
