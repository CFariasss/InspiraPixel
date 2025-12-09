<template>
  <footer class="site-footer">
    <div class="footer-grid">
      
      <div>
        <h3>Contato</h3>
        <p>contato@inspiralens.com</p>
        <p>Central de ajuda</p>
        <p>Rio de Janeiro – Brasil</p>
      </div>

      
      <div>
        <h3>Sobre</h3>
        <ul>
          <li><a href="#">Políticas</a></li>
          <li><a href="#">Políticas de privacidade</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>

      
      <div>
        <h3>Assine nossa newsletter</h3>
        <form @submit.prevent="subscribe">
          <input type="email" v-model="email" placeholder="Seu email" required />
          <button type="submit">Inscrever-se</button>
        </form>
      </div>

      
      <div class="social">
        <h3>Redes sociais</h3>
        <div class="icons">
          <a href="#"><Icon icon="mdi:facebook" /></a>
          <a href="#"><Icon icon="mdi:linkedin" /></a>
          <a href="#"><Icon icon="mdi:instagram" /></a>
          <a href="#"><Icon icon="mdi:twitter" /></a>
        </div>
      </div>
    </div>

    <p class="copyright">© 2025 InspiraPixel. Todos os direitos reservados.</p>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const email = ref("");

const subscribe = () => {
  // integrar com backend ou serviço de newsletter
  alert(`Inscrição realizada para: ${email.value}`);
  email.value = "";
};
</script>

<style scoped lang="scss">
.site-footer {
  background: #f9f9f9;
  padding: 2rem 1.5rem;
  border-top: 1px solid #ddd;
  margin-top: 3rem;
  font-size: 0.95rem;

  .footer-grid {
    display: grid;
    padding-left: 13rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;
    }

    a {
      text-decoration: none;
      color: #11101d;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      background: #e92782;
      color: #fff;
      border: none;
      padding: 0.5rem;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #db699e;
      }
    }
  }

  .social .icons {
    display: flex;
    gap: 1rem;
    font-size: 1.5rem;

    a {
      color: #e92782;

      &:hover {
        color: #e92782;
      }
    }
  }

  .copyright {
    text-align: center;
    color: #777;
    font-size: 0.85rem;
  }
}
</style>
