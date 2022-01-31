<script setup lang="ts">
import {computed} from 'vue';
import {CarPosition} from '@/lib/levels';
import {cars} from '@/lib/cars';
import {useGameSettingsStore} from '@/stores/gameSettings';
import { useMouseStore } from '@/stores/mouse';

const settings = useGameSettingsStore();
const mouse = useMouseStore();

const props = defineProps<{
    car: CarPosition,
}>();

const theCar = computed(() => cars.find(c => props.car.car === c.code)!);

const width = computed(() => props.car.horizontal ? theCar.value.size : 1);
const height = computed(() => props.car.horizontal ? 1 : theCar.value.size);

const gridColumnStart = computed(() => props.car.origin[0] + 1);
const gridRowStart = computed(() => props.car.origin[1] + 1);

// the mouse up event will be handled higher up
function onMousedown(e: MouseEvent) {
    // we don't want to trigger browser drag/drop
    e.preventDefault();
    mouse.selectCar(props.car.car);
}

const isSelected = computed(() => mouse.selectedCar === props.car.car);

</script>

<template>
    <span
        class="moving-car"
        :class="{'moving-car--selected': isSelected}"
        @mousedown.exact="onMousedown"
    >
        <span
            v-if="settings.showSolution"
            class="car-label"
        >
            {{ car.car }}
        </span>
    </span>
</template>

<style scoped>
/* we are working with a grid child here */
.moving-car {
    background-color: v-bind('theCar.color');
    grid-column-start: v-bind(gridColumnStart);
    grid-column-end: span v-bind(width);
    grid-row-start: v-bind(gridRowStart);
    grid-row-end: span v-bind(height);
    /* for the label shown sometimes */
    display: flex;
    justify-content: center;
    align-items: center;

    /* we will be handling the drag/drop stuff from an outside container */
    cursor: pointer;
}
.moving-car--selected {
    opacity: 0.5
}
.car-label {
    font-size: 4rem;
    line-height: 4rem;
    text-shadow: var(--vt-c-black) 0.1rem 0.1rem 0.2rem
}
</style>
