<template>
    <div
        :class="{
            'rating-wrapper': true,
            ...(styleClass ? { [styleClass]: true } : {})
        }"
    >
        <i class="rating-wrapper__star pi pi-star-fill"></i>    
        
        <h4 class="rating-wrapper__rating" v-text="props.rating" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    rating: number;
    styleClass?: string;
}>();
</script>

<style lang="scss" scoped>
.rating-wrapper {
    display: flex;
    align-items: center;

    &__rating {
        margin: 0;
        padding-left: .5rem;
    }

    &__star {
        color: var(--yellow-500);
    }
}
</style>