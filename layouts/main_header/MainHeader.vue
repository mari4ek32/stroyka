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
    </nav>
</template>

<script>
    export default {
        name: 'main-header'
    }
</script>

<style scoped>

</style>
