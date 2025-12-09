<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import Card from "../components/Card.vue";
import { getFavorites, toggleFavorite } from "../utils/storage";

const images = ref([]);
const favorites = ref(getFavorites());
const loading = ref(false);
const error = ref("");
const page = ref(1);
const query = ref(""); // opcional: tema de busca (nature, city, etc)


const fetchImages = async () => {
  loading.value = true;
  error.value = "";

  try {
    
    const endpoint = query.value
      ? "https://api.unsplash.com/search/photos"
      : "https://api.unsplash.com/photos";

    const params = query.value
      ? { page: page.value, per_page: 16, query: query.value }
      : { page: page.value, per_page: 16, order_by: "latest" };

    const { data } = await axios.get(endpoint, {
      params,
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      }
    });

    // Normaliza o resultado dependendo do endpoint
    const results = Array.isArray(data) ? data : data.results;

    images.value = results.map(img => ({
      id: img.id,
      author: img.user?.name ?? "Autor desconhecido",
      url: img.urls?.regular,
      full: img.urls?.full
    }));
  } catch (e) {
    error.value = "Erro ao carregar imagens da galeria.";
    // opcional: console.log(e.response?.data || e.message);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchImages);

// Controle de favoritos
const onToggleFavorite = (item) => {
  favorites.value = toggleFavorite(item);
};

// Navegação de página
const nextPage = () => { page.value += 1; };
const prevPage = () => { if (page.value > 1) page.value -= 1; };

// Recarrega quando page ou query mudarem
watch([page, query], fetchImages);
</script>

<template>
  <section class="gallery">
    <header class="gallery-header">
      <h2>Galeria</h2>
      <div class="controls">
        <input
          v-model="query"
          type="text"
          placeholder="Buscar tema (ex.: nature, city, space)"
        />
        <div class="pager">
          <button @click="prevPage" :disabled="page === 1">‹ Anterior</button>
          <span>Página {{ page }}</span>
          <button @click="nextPage">Próxima ›</button>
        </div>
      </div>
    </header>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="loading" class="loading">Carregando imagens...</p>

    <div class="grid" v-if="!loading && !error">
      <Card
        v-for="img in images"
        :key="img.id"
        :image="img"
        :favorite="new Set(favorites.map(f => f.id)).has(img.id)"
        :showInfo="false"
        @toggle-fav="onToggleFavorite"
        @open="() => {}"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.gallery {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.gallery-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .75rem;
  justify-content: space-between;
  margin-bottom: 1rem;

  h2 { color: #e92782; }

  .controls {
    display: flex;
    gap: .75rem;
    align-items: center;

    input {
      padding: .5rem .75rem;
      border: 1px solid #ddd;
      border-radius: .5rem;
      width: 260px;
    }

    .pager {
      display: flex;
      align-items: center;
      gap: .5rem;

      button {
        padding: .4rem .7rem;
        border: 1px solid #ddd;
        border-radius: .5rem;
        background: #fff;
        cursor: pointer;
      }
    }
  }
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.loading { color: #555; }
.error { color: #c0392b; }
</style>
