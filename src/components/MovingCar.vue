<script setup lang="ts">
import {computed} from 'vue';
import {CarPosition} from '@/lib/levels';
import {cars} from '@/lib/cars';

const props = defineProps<{
    car: CarPosition,
}>();

const theCar = computed(() => cars.find(c => props.car.car === c.code)!);

const width = computed(() => props.car.horizontal ? theCar.value.size : 1);
const height = computed(() => props.car.horizontal ? 1 : theCar.value.size);

const gridColumnStart = computed(() => props.car.origin[0] + 1);
const gridRowStart = computed(() => props.car.origin[1] + 1);

</script>

<template>
    <span
        class="moving-car"
    />
</template>

<style scoped>
/* we are working with a grid child here */
.moving-car {
    background-color: v-bind('theCar.color');
    grid-column-start: v-bind(gridColumnStart);
    grid-column-end: span v-bind(width);
    grid-row-start: v-bind(gridRowStart);
    grid-row-end: span v-bind(height);
}
</style>
