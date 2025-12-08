<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import Card from '../components/Card.vue';
import { getFavorites, toggleFavorite } from '../utils/storage';

// Estado
const images = ref([]);
const loading = ref(false);
const page = ref(1);
const limit = ref(12);
const favorites = ref(getFavorites());

// Computado para saber quais IDs estão favoritados
const favoritesIds = computed(() => new Set(favorites.value.map((i) => i.id)));

// Função para buscar imagens
const fetchImages = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get('https://picsum.photos/v2/list', {
      params: { page: page.value, limit: limit.value },
    });
    images.value = data;
  } catch (err) {
    console.error('Erro ao carregar imagens', err);
  } finally {
    loading.value = false;
  }
};

// Paginação
const next = () => { page.value++; fetchImages(); };
const prev = () => { if (page.value > 1) { page.value--; fetchImages(); } };

// Favoritos
const onToggleFavorite = (item) => {
  favorites.value = toggleFavorite(item);
};

// Inicializar
onMounted(fetchImages);
</script>

<template>
  <section class="gallery">
    <header class="bar">
      <h2>Galeria</h2>
      <div class="controls">
        <label>
          Página
          <input type="number" min="1" v-model.number="page" @change="fetchImages" />
        </label>
        <label>
          Limite
          <select v-model.number="limit" @change="fetchImages">
            <option v-for="n in [12,24,36]" :key="n" :value="n">{{ n }}</option>
          </select>
        </label>
      </div>
    </header>

    <div v-if="loading" class="status">Carregando...</div>

    <div v-else class="grid">
      <Card
        v-for="img in images"
        :key="img.id"
        :image="img"
        :favorite="favoritesIds.has(img.id)"
        @toggle-fav="onToggleFavorite"
      />
    </div>

    <footer class="pager">
      <button @click="prev" :disabled="page===1">Anterior</button>
      <span>Página {{ page }}</span>
      <button @click="next">Próxima</button>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.gallery {
  max-width: 1100px;
  margin: 1.5rem auto;
  padding: 0 1.25rem;
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.controls {
  display: flex;
  gap: .75rem;
}
.controls input, .controls select {
  padding: .4rem .6rem;
}
.status {
  padding: 1rem;
}
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
.pager {
  display: flex;
  justify-content: center;
  gap: .75rem;
  margin-top: 1rem;
}
</style>
