<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item"><nuxt-link class="nav-link" to="/about_us">{{ 'О нас' }}</nuxt-link></li>
          <li class="nav-item"><nuxt-link class="nav-link" to="contacts">{{ 'Контакты' }}</nuxt-link></li>
          <li class="nav-item"><nuxt-link class="nav-link" to="/delivery">{{ 'Доставка' }}</nuxt-link></li>
          <li class="nav-item"><nuxt-link class="nav-link" to="/track_order">{{ 'Отследить заказ' }}</nuxt-link></li>
        </ul>
      </div>
      <low-header @my-event="dosmth"></low-header>
    </nav>
</template>

<script>
  import LowHeader from "./LowHeader";
  export default {
    name: 'main-header',
    components: {LowHeader},
    methods: {
      dosmth (name) {
        alert(name)
      }
    }
  }
</script>

<style scoped>

</style>
