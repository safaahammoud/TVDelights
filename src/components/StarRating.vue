<template>
    <div
        :class="{
            'rate-wrapper': true,
            ...(styleClass ? { [styleClass]: styleClass } : {})
        }"
    >
        <i class="pi pi-star-fill"></i>    
        
        <h4 class="rate-wrapper__rate" v-text="props.rate" />
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    rate: number;
    styleClass?: string;
}>();

</script>

<style lang="scss" scoped>
.rate-wrapper {
    display: flex;
    align-items: center;

    &__rate {
        margin: 0;
        padding-left: .5rem;
    }
}
</style>