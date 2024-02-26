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

    <PrimeMenubar class="wrapper__menubar">
      <template #start>
        <router-link to="/">
          <img :src="logo" alt="logo" class="wrapper__menu-logo" />
        </router-link>
      </template>
    </PrimeMenubar>
    
    <div class="wrapper__loader-wrapper">
      <span id="label_status" />
      
      <PrimeProgressBar
        v-if="isLoading"
        mode="indeterminate"
        aria-labelledby="label_status"
        class="wrapper__loader-wrapper__loader"
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
    margin-top: 4rem;
  }

  &__loader-wrapper {
    right: 0;
    left: 0;
    top: 47px;
    position: absolute;
    
    &__loader {
      height: 5px;
    }
  }

  &__menubar {
    width: 100%;
    z-index: 9999;
    position: fixed;
    top: 0;
  }
}
</style>