<template>
    <PrimeDeferredContent
        role="region"
        aria-live="polite"
        aria-label="Content loaded after scroll"
    >
        <PrimeCarousel
            :value="props.list"
            content-class="carousel"
            :responsive-options="carouselResponsiveOptions"
        >
            <template #item="{ data }">
                <router-link :to="data.navigateTo">
                    <CarouselSliderItem
                        :name="data.name"
                        :image="data.image"
                        :genres="data.genres"
                        :rating="data.rating"
                    />
                </router-link>
            </template>
        </PrimeCarousel>

        <PrimePaginator
            :rows="10"
            :total-records="props.list.length"
            @page="emit('changePage', $event.page + 1)"
        />
    </PrimeDeferredContent>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CarouselResponsiveOptions } from 'primevue/carousel';

import { CAROUSEL_RESPONSIVE_OPTIONS } from '@/consts/CarouselResponsiveOptions.const';
import CarouselSliderItem from '@/components/Carousel/CarouselSliderItem.vue';
import type { TVShowCard } from '@/types/TVShow.type';

const props = defineProps<{
    list: TVShowCard[],
}>();

const emit = defineEmits<{
    changePage: [page: number]
}>();

const carouselResponsiveOptions = ref<CarouselResponsiveOptions[]>(CAROUSEL_RESPONSIVE_OPTIONS);
</script>

<style lang="scss" scoped>
.p-carousel :deep(.p-carousel-indicators) .p-carousel-indicator button {
    border-radius: 0.5rem;
}

.carousel {
    .p-carousel-item {
        min-height: 30rem;
  
        a {
            text-decoration: none;
        }
    }

}
</style>