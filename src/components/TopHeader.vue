<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <h1 class="header__title">Where in the World</h1>

        <div class="header-links">
          <router-link class="header__link" to="/">
            <house class="header__icon" /> Home
          </router-link>
          <button class="header__dark-switcher" @click="switchMode">
            <luna-dark v-if="!darkMode" class="header__icon" />
            <luna-light v-else class="header__icon" />

            {{ darkMode ? 'Light' : 'Dark' }} mode
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
  import LunaDark from '../assets/icons/LunaDark.vue'
  import LunaLight from '../assets/icons/LunaLight.vue'
  import House from '../assets/icons/House.vue'
  const darkMode = ref(false)
  const darkComponent = ref(LunaLight)

  const switchMode = () => {
    darkMode.value = !darkMode.value
    setDarkMode()
    localStorage.setItem('darkMode', darkMode.value)
  }
  const setDarkMode = () => {
    // eslint-disable-next-line
    console.log('Setting dark mode')

    const body = document.getElementsByTagName('body')[0]
    if (darkMode.value) {
      body.classList.add('dark')
    } else {
      body.classList.remove('dark')
    }
  }

  const followingChangeInDarkModePreference = (e) => {
    const newColorScheme = e.matches ? 'dark' : 'light'
    if (newColorScheme === 'dark') {
      darkMode.value = true
      setDarkMode()
    }
  }

  onBeforeMount(() => {
    // Dealing with dark mode
    const localModePreference = localStorage.getItem('darkMode')

    if (localModePreference) {
      darkMode.value = JSON.parse(localModePreference)
      setDarkMode()
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      darkMode.value = true
      setDarkMode()
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', followingChangeInDarkModePreference)
  })
  onBeforeUnmount(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', followingChangeInDarkModePreference)
  })
</script>

<style lang="scss" scoped></style>
