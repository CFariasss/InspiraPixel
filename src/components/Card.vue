<script setup>
import { computed } from 'vue';

const props = defineProps({
  image: { type: Object, required: true },   
  favorite: { type: Boolean, default: false },
  showInfo: { type: Boolean, default: false } 
});

// URL otimizada do Unsplash
const imageSrc = computed(() =>
  props.image.url
    ? `${props.image.url}?auto=format&fit=crop&w=1200&q=90`
    : `https://source.unsplash.com/random/1200x800/?nature`
);
</script>

<template>
  <article class="card">
    <!-- Botão de favorito -->
    <button class="fav" @click="$emit('toggle-fav', image)">
      <span :aria-label="favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
        {{ favorite ? '★' : '☆' }}
      </span>
    </button>

    <!-- Imagem principal -->
    <img
      :src="imageSrc"
      :alt="`Foto por ${image.author}`"
      loading="lazy"
      @click="$emit('open', image)"
    />

    <!-- Barra de informações (opcional, agora desativada por padrão) -->
    <div v-if="showInfo" class="info">
      <strong>{{ image.author }}</strong>
      <small>ID: {{ image.id }}</small>
    </div>
  </article>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  background: #0f0f12;
  border: 1px solid #1e1e22;
  border-radius: .75rem;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    aspect-ratio: 3/5;
    object-fit: cover;   // mantém proporção sem distorcer
    cursor: zoom-in;
  }

  .info {
    display: flex;
    justify-content: space-between;
    padding: .6rem .75rem;
    color: #cfd2da;
    background: #0f0f12;   // fundo sólido, não sobre a imagem
    border-top: 1px solid #1e1e22;
  }

  .fav {
    position: absolute;
    top: .5rem;
    right: .5rem;
    background: rgba(0,0,0,.5);
    color: #ffd166;
    border: none;
    padding: .3rem .5rem;
    border-radius: .5rem;
    cursor: pointer;
  }
}
</style>
