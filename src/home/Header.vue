<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="home-header">
    <img src="./../assets/spf-logo.png" class="spf-logo"/>
  </div>
</template>

<style scoped>
.home-header {
    height: 55px;
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    padding: 0 12px 0 24px;
    background-image: radial-gradient(transparent 1px, #fff 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    display: flex;
    place-items: center flex-start;
}
.spf-logo {
    height: 28px;
}
</style>
