<template>
    <div>
        <PrimeCarousel
            :value="props.list"
            content-class="carousel"
            :responsive-options="responsiveOptions"
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
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import CarouselSliderItem from '@/components/Carousel/CarouselSliderItem.vue';
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
}
</style>