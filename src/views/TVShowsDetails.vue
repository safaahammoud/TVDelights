<script setup lang="ts">
  import axios from 'axios';

  import { onMounted, ref, computed } from 'vue';
  import { useRoute } from 'vue-router';

  import defaultImagePlaceHolder from '@/assets/no-img-portrait-text.svg';
  import StarRating from '@/components/StarRating.vue';
  import type { TVShowDetailsApi } from '@/types/TVShow.type';

  let url = import.meta.env.VITE_API_BACKEND_URL;
  let tvShowDetails = ref<TVShowDetailsApi>();
  let isSummaryExpanded = ref<Boolean>(false);
  let isLoading = ref<Boolean>(false);
  let errorMessage = ref<string>('');
  let defaultErrorMessage = ref<string>('Error occurred');
  const route = useRoute();
  const isMobile = ref(window.matchMedia('(max-width: 768px)').matches);

  const tvShowDate = computed(() => (
    new Date(tvShowDetails.value?.premiered || '')?.getFullYear() || ''
  ));

  const formattedRuntime = computed(() => {
    if(tvShowDetails.value?.averageRuntime) {
      const hours = Math.floor(tvShowDetails.value.averageRuntime / 60);
      const minutes = tvShowDetails.value.averageRuntime % 60;
      
      return `${hours}hr ${minutes}mins`;
    }
    
    return '';
  });

  const updateIsMobile = () => {
    isMobile.value = window.matchMedia('(max-width: 768px)').matches;
  };

  const getTvShowDetails = (id: string = '') => {
    return axios.get<TVShowDetailsApi>(`${url}shows/${id}?embed[]=episodes&embed[]=cast`);
  };

  const setError = (error: string = '') => {
    errorMessage.value = error;
  };

  const setTVShowDetails = async () => {
    setError();
    isLoading.value = true;
    
    try {
      const { data } = await getTvShowDetails(route.params.id as string);

      tvShowDetails.value = data;
    } catch(error) {
      setError((error as Error)?.message || defaultErrorMessage.value);
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(async () => {
    window.addEventListener('resize', updateIsMobile);
    setTVShowDetails();
  });
</script>

<template>
  <div class="wrapper">
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>

    <template v-else>
      <div v-if="isLoading">
        <i class="wrapper__loader pi pi-spin pi-spinner"></i>
      </div>
  
      <div
        v-else
        class="tv-show-details"
      >
        <div class="tv-show-details__header">
          <div>
            <h1 class="tv-show-details__header__title">
              {{ tvShowDetails?.name || '' }}
            </h1>
    
            <ul class="tv-show-details__info-list">
              <li>
                {{ tvShowDate }}
              </li>
              
              <li>
                {{ formattedRuntime }}
              </li>
            </ul>
          </div>

          <div
            v-if="tvShowDetails?.rating.average"
            class="tv-show-details__rate-wrapper"
          >
            <span>
              RATING
            </span>

            <StarRating
              :rate="tvShowDetails.rating.average"
              style-class="tv-show-details__rate-wrapper__rate"
            />
          </div>
        </div>
        
        <div class="tv-show-details__poster">
          <img
              :src="tvShowDetails?.image?.original || defaultImagePlaceHolder"
              :alt="tvShowDetails?.name"
              class="tv-show-details__poster-left-image"
          />
        </div>

        <div v-if="tvShowDetails?.genres.length">
          <PrimeTag
              v-for="genre in tvShowDetails?.genres"
              :key="genre"
              rounded
              severity="info"
              :value="genre"
              class="tv-show-details__genres"
          />    
        </div>
        
        <!-- only use v-html you trust the content is safe and you know its not user-provided content -->
        <!-- eslint-disable vue/no-v-html -->
        <p
          :class="{ 'line-clamp': isMobile && !isSummaryExpanded }"
          v-html="tvShowDetails?.summary"
        />

        <span
          v-if="!isSummaryExpanded"
          class="tv-show-details__read-all-btn"
          @click="isSummaryExpanded=true"
        >
          Read all
        </span>
        <!-- eslint-enable vue/no-v-html -->
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 0 3rem;

  &__loader {
    font-size: 2rem;
  }

  .tv-show-details {
    &__info-list {
      list-style: none;
      padding-left: 0;
      margin: 0;
      display: flex;

      li:not(:first-child):before {
        display: inline-block;
        margin: 0 0.5rem 0.2rem;
        content: "";
        font-size: 1rem;
        line-height: .5rem;
        padding: 1px;
        border-radius: 50%;
        vertical-align: middle;
        background-color: black;
      }
    }
    
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__title {
        margin-bottom: 0;
      }

      &__rate-wrapper {
        display: flex;
        flex-direction: column;

        &__rate {
          font-size: 2rem;
        }
      }
    }

    &__poster {
      display: flex;
      flex-flow: wrap;
    }

    &__genres {
      margin: .5rem .5rem 0 0;
    }

    &__read-all-btn {
      display: block;
    }
  }

  @media screen and (max-width: 599px) {
    .tv-show-details {
      &__poster-left-image {
        width: calc(50% - 0.125rem);
      }
    }
  }

  @media screen and (min-width: 600px) {
    .tv-show-details {
      &__poster-left-image {
        width: calc(27.65% - 0.125rem);
      }

      &__read-all-btn {
        display: none;
      }
    }
  }
}
</style>