<script setup></script>

<template>
  <section class="hero">
    <div>
      <h2>Onde a paisagem vira <span>inspiração</span>.</h2>
      <p>
        Explore paisagens, cores e luzes que inspiram novas histórias através da
        fotografia.
      </p>
    </div>

    <img src="../assets/fotografo.png" alt="Imagem ilustrativa" />
  </section>
</template>

<style scoped lang="scss">
.hero {
  display: flex;
  padding-left: 6rem;
  padding-top: 80px; 
  align-items: center;
  justify-content: space-between;
  margin: 2rem;

  h2 {
    font-size: 4rem;
  }

  span {
    font-size: 8rem;
    color: #e1306c;
  }

  img {
    width: 38vw;
  }
}
</style>
