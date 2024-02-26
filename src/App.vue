<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';

import logo from '@/assets/logo.svg';
import { useTVShowStore } from '@/stores/TVShowStore';

let tvShowStore = useTVShowStore();
const { isLoading } = storeToRefs(tvShowStore);

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
    
    <div class="wrapper__loader">
      <span id="label_status" />
      
      <PrimeProgressBar
        v-if="isLoading"
        mode="indeterminate"
        aria-labelledby="label_status"
        class="wrapper__loader"
      />
    </div>

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

  &__loader {
    height: 5px;
  }
}
</style>