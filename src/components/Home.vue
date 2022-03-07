<template>
  <main class="main">
    <div class="container">
      <div class="main__top">
        <div class="main__control-group search">
          <span class="main__control-prepend-icon"><Magnify /></span>
          <input
            v-model="searchText"
            class="main__control-input"
            type="text"
            placeholder="Search for country..."
          />
        </div>
        <div class="main__control-group filter">
          <span class="main__control-label">{{
            filterText || 'Filter by Region'
          }}</span>
          <button
            class="main__control-append-icon"
            @click.stop="toggleShowFilter"
          >
            <ChevronDown />
          </button>
          <transition name="drop-down">
            <div
              ref="filterModal"
              id="filter-modal"
              v-if="showFilterModal"
              class="filter__modal"
            >
              <ul class="filter__modal-list">
                <li
                  v-for="(region, index) in countriesRegionList"
                  :key="region + index"
                  class="filter__modal-item"
                  @click="handleSelectFilter(region.value)"
                >
                  {{ region.name }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>

      <div class="main__grid">
        <div
          v-if="searchText && !countriesFiltered.length"
          class="main__grid--no-results"
        >
          No country found!
        </div>

        <transition-group
          v-else
          name="list"
          tag="ul"
          class="main__grid--countries"
        >
          <li
            v-for="country in countriesFiltered"
            :key="country"
            class="countries-item"
          >
            <router-link
              :to="`/${encodeURIComponent(country.name.toLowerCase())}`"
            >
              <country-item :country="country" />
            </router-link>
          </li>
        </transition-group>
      </div>
    </div>
  </main>
</template>
<script>
  export default {
    name: 'Home',
  }
</script>

<script setup>
  import Magnify from '../assets/icons/Magnify.vue'
  import ChevronDown from '../assets/icons/ChevronDown.vue'
  import CountryItem from './CountryItem.vue'
  import {
    onBeforeMount,
    ref,
    computed,
    onMounted,
    onBeforeUnmount,
    nextTick,
  } from 'vue'

  const countries = ref([])
  const searchText = ref('')
  const filterText = ref('')
  const showFilterModal = ref(false)
  const filterModal = ref(null)

  const countriesRegionList = computed(() => {
    const regionNames = [
      ...new Set(countries.value.map((country) => country.region)),
    ].sort()

    const regionesObjs = regionNames.map((region) => {
      return {
        name: region,
        value: region,
      }
    })
    regionesObjs.unshift({
      name: 'All',
      value: '',
    })
    return regionesObjs
  })

  const countriesFiltered = computed(() => {
    const noSpaces = searchText.value.trim().toLowerCase()
    const text = noSpaces.charAt(0).toUpperCase() + noSpaces.substring(1)
    const _countries = countries.value.map((c) => c)
    const filter = filterText.value
    const filteredCountries = _countries.filter((country) =>
      country.region.match(filter)
    )

    return filteredCountries.filter((country) => country.name.match(text))
  })

  const toggleShowFilter = () => {
    showFilterModal.value = !showFilterModal.value
    if (showFilterModal.value) {
      nextTick(() => {
        const item = filterModal.value.querySelector('.filter__modal-item')
        item.focus()
      })
    }
  }

  const handleSelectFilter = (filter) => {
    toggleShowFilter()
    filterText.value = filter
  }

  const handleClickOutside = (e) => {
    const modal = document.getElementById('filter-modal')
    if (
      e.target.matches('.main__control-append-icon') ||
      !e.target.closest('#filter-modal')
    ) {
      showFilterModal.value = false
    }
  }

  onBeforeMount(async () => {
    if (!countries.value.length) {
      const res = await fetch(
        'https://restcountries.com/v2/all?fields=name,capital,region,flags,population'
      )

      const data = await res.json()

      countries.value = data
    }
  })
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<style lang="scss" scoped></style>
