<template>
    <div>
        <PrimeCarousel
            :value="props.list"
            content-class="carousel"
            :responsive-options="responsiveOptions"
        >
            <template #item="slotProps">
                <router-link
                    :to="slotProps.data.navigateTo"
                    class="carousel__item"
                >
                    <div class="carousel__item__image-wrapper">
                        <img
                            :src="slotProps.data.image || defaultImagePlaceHolder"
                            :alt="slotProps.data.name"
                            class="carousel__item__image-wrapper__image"
                        />
                    </div>

                    <div class="carousel__item__wrapper">
                        <h3
                            class="carousel__item__title"
                            v-text="slotProps.data.name"
                        />
    
                        <div
                            v-if="slotProps.data.rating"
                            class="carousel__item__rating"
                        >
                           <StarRating :rate="slotProps.data.rating"/>
                        </div>
    
                        <div
                            v-if="slotProps.data.genres.length"
                            class="carousel__item__genres"
                        >
                            <PrimeTag
                                v-for="genre in slotProps.data.genres"
                                :key="genre"
                                :value="genre"
                                rounded
                                severity="info"
                                class="carousel__item__genres__tag"
                            />    
                        </div>
                    </div>
                </router-link>
            </template>
        </PrimeCarousel>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import defaultImagePlaceHolder from '@/assets/no-img-portrait-text.svg';
import StarRating from '@/components/StarRating.vue';
import type { TVShowCard } from '@/types/TVShow.type';

const props = defineProps<{
    list: TVShowCard[],
}>();

const responsiveOptions = ref([
    {
        breakpoint: '2000px',
        numVisible: 6,
        numScroll: 3
    },
    {
        breakpoint: '1199px',
        numVisible: 6,
        numScroll: 3
    },
    {
        breakpoint: '767px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

</script>

<style lang="scss" scoped>
.p-carousel :deep(.p-carousel-indicators) .p-carousel-indicator button {
    border-radius: 0.5rem;
}

.carousel {
    .p-carousel-item {
        min-height: 30rem;
    }

    &__item__wrapper {
        padding: 1rem;
    }


    &__item {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-decoration: none;
        margin: 0 0.5rem !important;
        text-align: center !important;
        border-radius: var(--border-radius) !important;
        border: 1px solid var(--surface-border) !important;

        &__image-wrapper {
            margin-bottom: 1rem;
    
            &__image {
                width: 100%;
            }
        }

        &__title {
            margin: 0 0 1rem 0;
        }
        
        &__title:hover {
            text-decoration: underline;
        }

        &__genres {
            &__tag {
                margin: 0 0.5rem 0.5rem 0;
            }
        }

        &__rating {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
        }
    }
}
</style>