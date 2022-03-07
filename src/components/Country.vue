<template>
  <main class="main country-page">
    <div class="container">
      <div class="main__top">
        <button @click="$router.go(-1)" class="main__control-group back">
          <span class="main__control-prepend-icon"><arrow-left /></span> Back
        </button>
      </div>
      <div v-if="countryData && countryData.name" class="country-page__grid">
        <div class="country-page__flag-grapper">
          <img :src="countryData.flags.svg" alt="" />
        </div>
        <div class="country-page__content">
          <h2 class="country-page__title">{{ countryData.name }}</h2>
          <div class="country-page__info">
            <div class="country-page__stats left">
              <ul>
                <li>
                  <strong>Native Name: </strong> {{ countryData.nativeName }}
                </li>
                <li>
                  <strong>Population: </strong>
                  {{ formatNumber(countryData.population) }}
                </li>
                <li><strong>Region: </strong> {{ countryData.region }}</li>
                <li>
                  <strong>Sub Region: </strong> {{ countryData.subregion }}
                </li>
                <li><strong>Capital: </strong> {{ countryData.capital }}</li>
              </ul>
            </div>
            <div class="country-page__stats right">
              <ul>
                <li v-if="countryData.topLevelDomain">
                  <strong>Top level Domain:</strong>
                  {{ countryData.topLevelDomain[0] }}
                </li>
                <li v-if="countryData.currencies">
                  <strong>Currency:</strong>
                  {{ countryData.currencies[0].name }}
                </li>
                <li v-if="countryData.languages.length">
                  <strong>Languajes: </strong>
                  <span
                    v-for="(lang, index) in countryData.languages"
                    :key="lang.name + index"
                    >{{ lang.name
                    }}{{
                      index < countryData.languages.length - 1 ? ', ' : ''
                    }}</span
                  >
                </li>
              </ul>
            </div>
            <div class="country-page__stats bottom">
              <div class="country-page__stats__borders-title">
                <strong>Border Countries: </strong>
              </div>
              <div class="country-page__stats__borders-pills">
                <router-link
                  v-for="(border, index) in countryData.bordersNames"
                  :key="border + index"
                  :to="`/${border.name.toLowerCase()}`"
                  class="pill"
                >
                  {{ border.name }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import ArrowLeft from '../assets/icons/ArrowLeft.vue'

  const route = useRoute()
  const countryData = ref(null)

  const fetchData = async (newName) => {
    if (newName) {
      const res = await fetch(`https://restcountries.com/v2/name/${newName}`)
      const data = await res.json()

      if (data[0].borders) {
        let borders = data[0].borders
        const bordersString = borders.join().toLowerCase()

        const bordersCountriesRes = await fetch(
          `https://restcountries.com/v2/alpha?codes=${bordersString}&fields=name`
        )
        const bordersCountriesData = await bordersCountriesRes.json()

        data[0].bordersNames = bordersCountriesData
      }

      // eslint-disable-next-line
      console.log(data[0])

      return data[0]
    }
  }
  const formatNumber = (value) => {
    const number = new Intl.NumberFormat().format(value)
    return number
  }
  onMounted(async () => {
    const newName = route.params.name.toLowerCase()
    countryData.value = await fetchData(newName)
  })
</script>

<style lang="scss" scoped></style>
