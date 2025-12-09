<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref("");

const login = () => {
  if (username.value && password.value) {
    // Simulação de login: salva um token no localStorage
    localStorage.setItem("userToken", "fake-token");
    localStorage.setItem("username", username.value);

    // Redireciona para a galeria ou favoritos
    router.push("/galeria");
  } else {
    error.value = "Preencha usuário e senha.";
  }
};
</script>

<template>
  <section class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="field">
        <label for="username">Usuário</label>
        <input id="username" v-model="username" type="text" />
      </div>

      <div class="field">
        <label for="password">Senha</label>
        <input id="password" v-model="password" type="password" />
      </div>

      <button type="submit">Entrar</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<style scoped lang="scss">
.login {
  max-width: 400px;
  margin: 12rem auto 14rem; 
  padding: 2rem;
  background: #f9f9f9;
  border-radius: .75rem;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);

  h2 {
    margin-bottom: 1rem;
    color: #e92782;
  }

  .field {
    margin-bottom: 1rem;

    label {
      display: block;
      margin-bottom: .25rem;
      font-weight: 600;
    }

    input {
      width: 100%;
      padding: .5rem;
      border: 1px solid #ccc;
      border-radius: .5rem;
    }
  }

  button {
    background: #4f46e5;
    color: #fff;
    border: none;
    padding: .6rem 1rem;
    border-radius: .5rem;
    cursor: pointer;
    font-weight: 600;
  }

  .error {
    margin-top: 1rem;
    color: #c0392b;
  }
}
</style>
