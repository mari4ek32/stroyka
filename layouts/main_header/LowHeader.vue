<template>
    <button @click="init" class="btn btn-danger">{{ 'Маша нажми меня' }}</button>
</template>

<script>
    export default {
      name: 'low-header',
      data () {
        return {
          name: 'Машка Какашка'
        }
      },
      methods: {
        init () {
          this.$emit('my-event', this.name)
        }
      }
    }
</script>

<style scoped>

</style>
