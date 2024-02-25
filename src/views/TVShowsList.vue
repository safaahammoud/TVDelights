<script setup lang="ts">  
  import { computed, onMounted } from 'vue';

  import CarouselSlider from '@/components/Carousel/CarouselSlider.vue';
  import debounce from '@/utils/debounce.util';
  import { useTVShowStore } from '@/stores/TVShowStore';

  let tvShowStore = useTVShowStore();

  let isLoading = computed(() => {    
    return tvShowStore.isLoading;
  });
  let tvShows = computed(() => {
    return tvShowStore.tvShows;
  });

  const searchTvShows = debounce(async (event: Event) => {
    const search: string = (event.target as HTMLInputElement).value;
   
    tvShowStore.fetchAllTVShows({ search });
  });

  onMounted(() => {
    tvShowStore.fetchAllTVShows();
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
        v-if="tvShows?.length"
        :list="tvShows"
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