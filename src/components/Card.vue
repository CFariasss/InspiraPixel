<script setup>
import { computed } from 'vue';

const props = defineProps({
  image: { type: Object, required: true },
  favorite: { type: Boolean, default: false },
});

// URL otimizada
const imageSrc = computed(() => `https://picsum.photos/id/${props.image.id}/600/400`);
</script>

<template>
  <article class="card">
    <button class="fav" @click="$emit('toggle-fav', image)">
      <span :aria-label="favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
        {{ favorite ? '★' : '☆' }}
      </span>
    </button>
    <img
      :src="imageSrc"
      :alt="`Foto por ${image.author}`"
      loading="lazy"
      @click="$emit('open', image)"
    />
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
    aspect-ratio: 3/2;
    object-fit: cover;
    cursor: zoom-in;
  }

  .info {
    display: flex;
    justify-content: space-between;
    padding: .6rem .75rem;
    color: #cfd2da;
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
