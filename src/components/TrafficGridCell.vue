<script setup lang="ts">

import {computed} from 'vue';
import {useGameSettingsStore} from '@/stores/gameSettings';
import {useMouseStore} from '@/stores/mouse';

const settings = useGameSettingsStore();
const mouse = useMouseStore();

const props = defineProps<{
    /** location of this square in the grid */
    x: number,
    /** location of this square in the grid */
    y: number,
    /** index of this square in the grid */
    index: number,
}>();

const gridRowStart = computed(() => props.y + 1);
const gridColumnStart = computed(() => props.x + 1);

/** only informs the coordinate to the mouse store, not the car, that is handled elsewhere */
function onMouseenter() {
    mouse.reportCoordinates(props.x, props.y);
}

function onMousedown(e: MouseEvent) {
    e.preventDefault(); // avoid native drag/drop
    mouse.selectHoveredCar();
}
</script>

<template>
    <span
        class="tg-square"
        @mouseenter="onMouseenter"
        @mousedown="onMousedown"
    >
        <span v-if="settings.showCoordinates">
            {{index}}<br>
            ({{x}}, {{y}})
        </span>
    </span>
</template>

<style scoped>
.tg-square {
    background-color: var(--color-background-soft);
    border: 1px solid var(--color-border);
    grid-column-start: v-bind(gridColumnStart);
    grid-column-end: span 1;
    grid-row-start: v-bind(gridRowStart);
    grid-row-end: span 1;
    /** ha a lot of mouse events, make sure touch can see them */
    cursor: pointer;
}
</style>
