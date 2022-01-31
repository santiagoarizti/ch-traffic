<script setup lang="ts">

import {computed} from 'vue';
import {useGameSettingsStore} from '@/stores/gameSettings';

const props = defineProps<{
    /** location of this square in the grid */
    x: number,
    /** location of this square in the grid */
    y: number,
    /** index of this square in the grid */
    index: number,
}>();

const settings = useGameSettingsStore();

const gridRowStart = computed(() => props.y + 1);
const gridColumnStart = computed(() => props.x + 1);
</script>

<template>
    <span
        class="tg-square"
    >
        <span v-if="settings.showCoordenates">
            {{index}}<br>
            ({{x}}, {{y}})
        </span>
    </span>
</template>

<style scoped>
.tg-square {
    border: 1px solid var(--color-border);
    grid-column-start: v-bind(gridColumnStart);
    grid-column-end: span 1;
    grid-row-start: v-bind(gridRowStart);
    grid-row-end: span 1;
}
</style>
