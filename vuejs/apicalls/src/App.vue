<template>
  <NavbarCompo />
  <!-- <router-link href="/">Home</router-link> -->
  <!-- <router-link href="/get-tasks">Get All Task</router-link> -->
  <!-- <router-link href="/create-task">Create Task</router-link> -->
  <router-view>
  </router-view>
</template>

<script>
import NavbarCompo from './components/NavbarCompo.vue'

export default {
  name: 'App',
  components: {
    NavbarCompo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
