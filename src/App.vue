<script setup>
  import TopHeader from './components/TopHeader.vue'
  import MyFooter from './components/MyFooter.vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
</script>

<template>
  <div class="main-container">
    <TopHeader></TopHeader>
    <router-view v-slot="{ Component }">
      <transition name="change">
        <keep-alive include="home">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>

    <MyFooter></MyFooter>
  </div>
</template>

<style></style>
