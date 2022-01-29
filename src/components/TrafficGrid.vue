<script setup lang="ts">
import {useGameStore} from '@/stores/game';
import {useGameSettingsStore} from '@/stores/gameSettings';
import {ref, computed} from 'vue';
import MovingCar from './MovingCar.vue';

const game = useGameStore();
const settings = useGameSettingsStore();

const size = computed(() => game.level?.size ?? [4, 4]);

const gridSize = computed(() => size.value.map(s => s * settings.squareSize));

const squares = computed(() => {
    const squares = [];
    for (let x = 0; x < size.value[0]; x++) {
        for (let y = 0; y < size.value[1]; y++) {
            squares.push({
                x, y,
            });
        }
    }
    return squares;
});

const cars = computed(() => game.level?.carsPositions ?? []);

const showCoordenates = ref(false);

</script>

<template>
    <div class="traffic-grid">
        <span
            class="tg-square"
            v-for="(s, i) of squares"
            :key="i"
            :style="{gridColumnStart: s.y + 1, gridRowStart: s.x + 1}"
        >
            <span v-if="showCoordenates">
                {{i}}<br>
                ({{s.x}}, {{s.y}})
            </span>
        </span>

        <MovingCar
            v-for="car of cars"
            :key="car.car"
            :car="car"
        />
    </div>
</template>

<style>
.traffic-grid {
    background-color: var(--color-background-soft);
    width:  v-bind("`${gridSize[0]}px`");
    height: v-bind("`${gridSize[1]}px`");

    display: grid;
    grid-template-columns: repeat(v-bind('size[0]'), 1fr);
    grid-template-rows: repeat(v-bind('size[1]'), 1fr);
}

.tg-square {
    border: 1px solid var(--color-border);
    /* grid-column-start: bound directly to :style; */
    grid-column-end: span 1;
    /* grid-row-start: bound directly to :style; */
    grid-row-end: span 1;
}
</style>
