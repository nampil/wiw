<template>
  <div class="country-item__card">
    <div class="country-item__card-img-wrapper">
      <img
        class="country-item__flag"
        :src="country.flags.png"
        :alt="country.title + 'flag'"
      />
    </div>

    <div class="country-item__card-content">
      <h4 class="country-item__card-title">{{ country.name }}</h4>
      <ul class="country-item__card-stats">
        <li><strong>Population:</strong> {{ country.population }}</li>
        <li><strong>Region:</strong> {{ country.region }}</li>
        <li><strong>Capital:</strong> {{ country.capital }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'

  const props = defineProps({
    country: Object,
  })
</script>

<style lang="scss" scoped></style>
