<script setup>
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// estado de login simples via localStorage
const isLoggedIn = ref(!!localStorage.getItem("userToken"));
const username = computed(() => localStorage.getItem("username") || "");

// função de logout
const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("username");
  isLoggedIn.value = false;
  router.push("/login");
};
</script>

<template>
  <header>
    <img src="../assets/logo.png" alt="Logo" />

    <nav>
      <ul>
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/galeria">Galeria</router-link></li>
        <li><router-link to="/favoritos">Favoritos</router-link></li>
        <li>
          <a href="#">
            <Icon icon="material-symbols:search" width="24" height="24" />
          </a>
        </li>
        <li class="user-menu">
          <!-- Ícone de usuário -->
          <Icon icon="material-symbols:person-outline" width="28" height="28" />

          <!-- Dropdown -->
          <ul class="dropdown">
            <li v-if="!isLoggedIn">
              <router-link to="/login">Login</router-link>
            </li>
            <li v-if="!isLoggedIn">
              <router-link to="/signup">Cadastre-se</router-link>
            </li>
            <li v-if="isLoggedIn">
              <button @click="logout">Logoff</button>
            </li>
            <li v-if="isLoggedIn && username">
              <span class="username">Olá, {{ username }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;       
  top: 0;
  left: 0;
  width: 100%;           
  background: #fff;      
  z-index: 1000;         
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;    
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); 

  img {
    height: 40px;
  }

  nav ul {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 1rem;
  }

  a,
  router-link,
  button {
    text-decoration: none;
    color: black;
    font-weight: 500;
    font-size: 1.1rem;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: .25rem;
  }

  router-link:hover,
  button:hover {
    text-decoration: underline;
  }

  .user-menu {
    position: relative;
    cursor: pointer;

    .dropdown {
      display: none;
      position: absolute;
      top: 120%;
      right: 0;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: .5rem;
      list-style: none;
      padding: .5rem .75rem;
      box-shadow: 0 4px 12px rgba(0,0,0,.1);
      min-width: 150px;

      li {
        margin: .25rem 0;
      }

      a, button, span {
        display: block;
        width: 100%;
        text-align: left;
        padding: .25rem 0;
        color: #333;
      }
    }

    &:hover .dropdown {
      display: block;
    }

    .username {
      font-size: .9rem;
      color: #555;
    }
  }
}
</style>
