<script setup lang="ts">
  import axios from 'axios';
  
  import { onMounted, ref } from 'vue';

  import CarouselSlider from '@/components/CarouselSlider.vue';
  import type {
    TVShow,
    TVShowCard,
    TVShowsListApi,
    TVShowListDetails,
  } from '@/types/TVShow.type';
  import debounce from '@/utils/debounce.util';

  let tvShows = ref<TVShowCard[]>([]);
  let isLoading = ref<Boolean>(false);
  let errorMessage = ref<string>('');
  let defaultErrorMessage = ref<string>('Error occurred');
  let url = import.meta.env.VITE_API_BASE_URL;

  const getSearchTvShows = (searchTerm: string | null) => {
    return axios.get<TVShowsListApi>(`${url}search/shows?q=${searchTerm}`);
  };

  const getTvShows = () => {
    return axios.get<TVShow[]>(`${url}shows?page=1`);
  };

  const showError = (error: string = '') => {
    errorMessage.value = error;
  };

  const searchTvShows = debounce(async (event: Event) => {
    const searchTerm: string = (event.target as HTMLInputElement).value;
   
    setTVShowsList(searchTerm);
  });

  const setTVShowsList = async (searchTerm: string = '') => {
    showError();
    isLoading.value = true;
    
    try {
      const { data } = (searchTerm) ? await getSearchTvShows(searchTerm) : await getTvShows();

      const transformTvShowItem = (tvShowItem: TVShowListDetails | TVShow): TVShowCard => {
        const id = ('show' in tvShowItem) ? tvShowItem.show.id : tvShowItem.id;
        const name = ('show' in tvShowItem) ? tvShowItem.show.name : tvShowItem.name;
        const image = ('show' in tvShowItem) ? tvShowItem.show.image?.original : tvShowItem.image.original;
        const genres = ('show' in tvShowItem) ? tvShowItem.show.genres : tvShowItem.genres;
        const rating = ('show' in tvShowItem) ? tvShowItem.show.rating?.average : tvShowItem.rating?.average;
        const navigateTo = { name: 'tv-show-details', params: { id } };

        return {
          id,
          name,
          genres: genres.slice(0, 3),
          image,
          rating: rating || 0,
          navigateTo,
        };
    };

    tvShows.value = data.slice(0, 20).map(transformTvShowItem);
    } catch(error) {
      showError((error as Error)?.message || defaultErrorMessage.value);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(async () => {
    setTVShowsList();
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
    
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>

    <template v-else>
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