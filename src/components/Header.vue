<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <header>
    <img src="../assets/logo.png" alt="Logo" />

    <nav>
      <ul>
        <li>
          <router-link to="/">
            Início
          </router-link>
        </li>
        <li>
          <router-link to="/galeria">
            Galeria
          </router-link>
        </li>
        <li>
          <router-link to="/favoritos">
            Favoritos
          </router-link>
        </li>
        <li>
          <a href="#">
            <Icon icon="material-symbols:search" width="24" height="24" />
          </a>
        </li>
        <li>
          <a href="#">
            <Icon icon="material-symbols:person-outline" width="24" height="24" />
          </a>
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
  router-link {
    text-decoration: none;
    color: black;
    font-weight: 500;
    font-size: 1.25rem;
  }

  router-link:hover {
    text-decoration: underline;
  }
}

</style>
