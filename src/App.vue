<script setup lang="ts">
import { RouterView } from 'vue-router';

import logo from '@/assets/logo.svg';
</script>

<template>
  <div class="wrapper">
    <PrimeToast />

    <PrimeMenubar>
      <template #start>
        <router-link to="/">
          <img :src="logo" alt="logo" class="wrapper__menu-logo" />
        </router-link>
      </template>
    </PrimeMenubar>
  
    <div class="wrapper__content">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  &__menu-logo {
    width: 2rem;
  }
  
  &__content {
    padding: 1rem;
  }
}
</style>