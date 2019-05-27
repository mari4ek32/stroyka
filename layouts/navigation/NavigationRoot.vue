<template>
    <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
      <nuxt-link to="/" class="nav-link active" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Инструменты</nuxt-link>
      <nuxt-link to="/" class="nav-link" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Бетон и ЖБИ</nuxt-link>
    </div>
</template>

<script>
  export default {
    name: "navigation-root"
  }
</script>

<style scoped>

</style>
