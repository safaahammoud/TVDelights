<template>
    <div>
        <Carousel
            :value="props.list"
            :numVisible="3"
            :numScroll="3"
            contentClass="carousel"
            :responsiveOptions="responsiveOptions"
        >
            <template #item="slotProps">
                <div class="carousel__item">
                    <div class="carousel__item__image-wrapper">
                        <img
                            :src="slotProps.data.show.image?.original || defaultImagePlaceHolder"
                            :alt="slotProps.data.show.name"
                            class="carousel__item__image-wrapper__image"
                        />
                    </div>

                    <div class="carousel__item__wrapper">
                        <h3 class="carousel__item__title">{{ slotProps.data.show.name || '' }}</h3>
    
                        <h4 v-if="slotProps.data.show.rating.average">
                            <i class="pi pi-star-fill"></i>
    
                            {{ slotProps.data.show.rating.average }}
                        </h4>
    
                        <div
                            v-if="slotProps.data.show.genres.length"
                            class="carousel__item__genres"
                        >
                            <template v-for="genre in slotProps.data.show.genres" :key="genre">
                                <Tag
                                    rounded
                                    severity="info"
                                    :value="genre"
                                    class="carousel__item__genres__tag"
                                />    
                            </template>
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import defaultImagePlaceHolder from '@/assets/no-img-portrait-text.png';
import type { TVShowsListApi } from '@/types/TVShow.type';

const props = defineProps<{
    list: TVShowsListApi,
}>();

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

</script>

<style lang="scss" scoped>
.carousel {
    .p-carousel-item {
        min-height: 30rem;
    }

    &__item__wrapper {
        padding: 1rem;
    }

    .p-carousel-indicator {
        border-radius: 0.5rem; //TODO: override style of the component when using scoped attr
    }

    &__item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        border-radius: var(--border-radius) !important;
        border: 1px solid var(--surface-border) !important;
        margin: 0 0.5rem !important;
        text-align: center !important;

        &__image-wrapper {
            margin-bottom: 1rem;
    
            &__image {
                width: 100%;
            }
        }

        &__title {
            margin: 0 0 1rem 0;
        }

        &__genres {
            &__tag {
                margin: 0 0.5rem 0.5rem 0;
            }
        }
    }
}
</style>