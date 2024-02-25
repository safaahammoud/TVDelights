<script setup lang="ts">  
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import CarouselSlider from '@/components/Carousel/CarouselSlider.vue';
import { useTVShowStore } from '@/stores/TVShowStore';
import debounce from '@/utils/debounce.util';

let tvShowStore = useTVShowStore();
const { fetchAllTVShows } = tvShowStore;
const { isLoading, tvShowsCards } = storeToRefs(tvShowStore);

const searchTvShows = debounce(async (event: Event) => {
  const search: string = (event.target as HTMLInputElement).value;
  
  fetchAllTVShows({ search });
});

onMounted(() => {
  fetchAllTVShows();
});
</script>

<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <span id="searchInputLabel">Search latest TV shows</span>
  
      <PrimeInputText
          aria-labelledby="searchInputLabel"
          class="searchInput"
          placeholder="Search..."
          @keyup="searchTvShows"
      />
    </div>

    <div v-if="isLoading">
      <i class="wrapper__loader pi pi-spin pi-spinner"></i>
    </div>

    <template v-else>
      <CarouselSlider
        v-if="tvShowsCards?.length"
        :list="tvShowsCards"
      />

      <h3 v-else>No records found</h3>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 0 3rem;
  .search-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;
  
    .searchInput {
      margin-top: 1rem;
    }
  }

  &__loader {
    font-size: 2rem;
  }
}
</style>