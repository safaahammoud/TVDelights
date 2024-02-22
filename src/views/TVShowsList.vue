<script setup lang="ts">
  import axios from 'axios';
  
  import { onMounted, ref } from 'vue';

  import CarouselSlider from '@/components/CarouselSlider.vue';
  import type { TVShowsListApi } from '@/types/TVShow.type';
  import debounce from '@/utils/debounce.util';

  let tvShows = ref<TVShowsListApi>([]);
  let isLoading = ref<Boolean>(false);
  let errorMessage = ref<string>('');
  let defaultErrorMessage = ref<string>('Error occurred');
  let url = import.meta.env.VITE_API_BASE_URL;

  const getTvShows = (searchTerm: string | null) => {
    return axios.get<TVShowsListApi>(`${url}/search/shows?q=${searchTerm}`);
  };

  const showError = (error: string = '') => {
    errorMessage.value = error;
  };

  const searchTvShows = debounce(async (event: Event) => {
    const searchTerm: string = (event.target as HTMLInputElement).value;
   
    setTVShowsList(searchTerm);
  });

  const setTVShowsList = async (searchTerm: string | null) => {
    showError();
    isLoading.value = true;
    
    try {
      const { data } = await getTvShows(searchTerm);

      tvShows.value = data;
    } catch(error) {
      showError((error as Error)?.message || defaultErrorMessage.value);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(async () => {
    setTVShowsList(null);
  });

</script>

<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <span id="searchInputLabel">Search latest TV shows</span>
  
      <InputText
          aria-labelledby="searchInputLabel"
          class="searchInput"
          placeholder="Search..."
          @keyup="searchTvShows"
      />
    </div>
    
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>

    <template v-else>
      <p v-if="isLoading">Loading...</p>
  
      <template v-else>
        <CarouselSlider :list="tvShows"/>
      </template>
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
}
</style>