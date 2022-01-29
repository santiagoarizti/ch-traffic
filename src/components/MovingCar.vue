<script setup lang="ts">import { CarPosition } from '@/lib/levels';

const props = defineProps<{
    car: CarPosition,
}>();

</script>

<template>
    <span
        class="moving-car"
    />
</template>

<style scoped>
/* we are working with a grid child here */
.moving-car {

}
</style>
