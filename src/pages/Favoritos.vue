<script setup>
import { ref, onMounted } from 'vue';
import Card from '../components/Card.vue';
import { getFavorites, setFavorites, toggleFavorite } from '../utils/storage';

const isLoggedIn = ref(!!localStorage.getItem("userToken"));
const items = ref([]);
const modalItem = ref(null);

onMounted(() => {
  if (isLoggedIn.value) {
    items.value = getFavorites();
  }
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
      <div class="actions">
        <!-- Apenas limpar todos -->
        <button v-if="isLoggedIn && items.length" @click="clear">Limpar todos</button>
      </div>
    </header>

    <!-- Se não estiver logado -->
    <div v-if="!isLoggedIn" class="login-warning">
      <p>Você precisa estar logado para acessar seus favoritos.</p>
      <div class="actions">
        <router-link to="/login" class="btn login">Login</router-link>
        <router-link to="/signup" class="btn signup">Cadastre-se</router-link>
      </div>
    </div>

    <!-- Se estiver logado -->
    <p v-else-if="!items.length" class="empty">Você ainda não tem favoritos.</p>

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
  margin: 7rem auto 2rem;
  padding: 0 1.25rem;
  min-height: 70vh; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  

  .actions {
    display: flex;
    gap: 1rem;
  }
}
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
.empty {
  color: #666;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
}
.login-warning {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: .75rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);

  p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;

    .btn {
      padding: .6rem 1rem;
      border-radius: .5rem;
      text-decoration: none;
      font-weight: 600;
      color: #fff;
    }

    .login {
      background: #e92782;
    }

    .signup {
      background: #e92782;
    }
  }
}
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.75);
  display: grid;
  place-items: center;
  padding: 2rem;
  z-index: 9999;
}
.modal img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: .75rem;
}
.close {
  margin-top: 1rem;
  background: #4f46e5;
  color: #fff;
  border: none;
  padding: .6rem 1rem;
  border-radius: .5rem;
  cursor: pointer;
}
</style>

