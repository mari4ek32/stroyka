<template>
    <header>
      <ul class="navbar navbar-light bg-light">
        <li><nuxt-link to="/about_us">{{'О нас'}}</nuxt-link></li>
        <li><nuxt-link to="/contacts">{{'Контакты'}}</nuxt-link></li>
        <li><nuxt-link to="/delivery">{{'Доставка и подъем'}}</nuxt-link></li>
        <li><nuxt-link to="/track_order">{{'Проверить заказ'}}</nuxt-link></li>
      </ul>
    </header>
</template>

<script>
    export default {
        name: "main-header"
    }
</script>

<style scoped>

</style>
