<template>
    <div class="carousel__item">
        <div class="carousel__item__image-wrapper">
            <img
                :src="props.image || defaultImagePlaceHolder"
                :alt="props.name"
                class="carousel__item__image-wrapper__image"
            />
        </div>

        <div class="carousel__item__content-wrapper">
            <h3
                class="carousel__item__title"
                v-text="props.name"
            />

            <div
                v-if="props.rating"
                class="carousel__item__rating"
            >
                <StarRating :rate="props.rating"/>
            </div>

            <div
                v-if="props.genres.length"
                class="carousel__item__genres"
            >
                <PrimeTag
                    v-for="genre in props.genres"
                    :key="genre"
                    :value="genre"
                    rounded
                    severity="info"
                    class="carousel__item__genres__tag"
                />    
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import defaultImagePlaceHolder from '@/assets/no-img-portrait-text.svg';
import StarRating from '@/components/StarRating.vue';

const props = defineProps<{
    name: string;
    image: string;
    rating: number;
    genres: string[];
}>();
</script>

<style lang="scss" scoped>
.carousel {
    &__item__content-wrapper {
        padding: 1rem;
    }

    &__item {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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