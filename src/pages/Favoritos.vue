<script setup>
import { ref, onMounted } from 'vue';
import Card from '../components/Card.vue';
import { getFavorites, setFavorites, toggleFavorite } from '../utils/storage';

const items = ref([]);
const modalItem = ref(null);

onMounted(() => {
  items.value = getFavorites();
});

const onToggle = (item) => {
  items.value = toggleFavorite(item);
};
const clear = () => {
  setFavorites([]);
  items.value = [];
};
const openModal = (item) => { modalItem.value = item; };
const closeModal = () => { modalItem.value = null; };
</script>

<template>
  <section class="favorites">
    <header class="bar">
      <h2>Favoritos</h2>
      <button v-if="items.length" @click="clear">Limpar todos</button>
    </header>

    <p v-if="!items.length" class="empty">Você ainda não tem favoritos.</p>

    <div class="grid" v-else>
      <Card
        v-for="img in items"
        :key="img.id"
        :image="img"
        :favorite="true"
        @toggle-fav="onToggle"
        @open="openModal"
      />
    </div>

    <div v-if="modalItem" class="modal" @click.self="closeModal">
      <img :src="`https://picsum.photos/id/${modalItem.id}/1200/800`" :alt="`Foto por ${modalItem.author}`" />
      <button class="close" @click="closeModal">Fechar</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.favorites {
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
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
.empty {
  color: #666;
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
</style>
