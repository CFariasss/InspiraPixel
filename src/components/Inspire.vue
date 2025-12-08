<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import Card from "./Card.vue";
import { getFavorites, toggleFavorite } from "../utils/storage";


const images = ref([]);
const favorites = ref(getFavorites());
const modalItem = ref(null);

// IDs favoritados
const favoritesIds = computed(() => new Set(favorites.value.map((i) => i.id)));


const fetchImages = async () => {
  try {
    const { data } = await axios.get("https://picsum.photos/v2/list", {
      params: { page:103, limit: 4 }, // só 4 imagens
    });
    images.value = data;
  } catch (err) {
    console.error("Erro ao carregar imagens", err);
  }
};

onMounted(fetchImages);


const onToggleFavorite = (item) => {
  favorites.value = toggleFavorite(item);
};


const openModal = (item) => { modalItem.value = item; };
const closeModal = () => { modalItem.value = null; };
</script>

<template>
  <section class="inspire">
    <h2>Inspire-se</h2>
    <p>Um gostinho da nossa galeria completa:</p>

    <div class="grid">
      <Card
        v-for="img in images"
        :key="img.id"
        :image="img"
        :favorite="favoritesIds.has(img.id)"
        @toggle-fav="onToggleFavorite"
        @open="openModal"
      />
    </div>

    <router-link to="/galeria" class="more">
      Ver galeria completa →
    </router-link>

    <!-- Modal -->
    <div v-if="modalItem" class="modal" @click.self="closeModal">
      <img :src="`https://picsum.photos/id/${modalItem.id}/1200/800`" :alt="`Foto por ${modalItem.author}`" />
      <button class="close" @click="closeModal">Fechar</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.inspire {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1.25rem;

  h2 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
    color: #555;
  }

  .grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }

  .more {
    display: inline-block;
    margin-top: 1rem;
    color: #4f46e5;
    font-weight: 600;
    text-decoration: none;
  }

  .modal {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.75);
    display: grid;
    place-items: center;
    padding: 2rem;
  }

  .modal img {
    width: min(100%, 1100px);
    border-radius: .75rem;
  }

  .close {
    margin-top: 1rem;
    background: #4f46e5;
    color: #fff;
    border: none;
    padding: .6rem 1rem;
    border-radius: .5rem;
  }
}
</style>
