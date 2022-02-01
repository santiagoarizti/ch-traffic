<script setup lang="ts">
import {useGameStore} from '@/stores/game';
import {useGameSettingsStore} from '@/stores/gameSettings';
import {useMouseStore} from '@/stores/mouse';
import {computed} from 'vue';
import MovingCar from './MovingCar.vue';
import TrafficGridCell from './TrafficGridCell.vue';

const game = useGameStore();
const settings = useGameSettingsStore();
const mouse = useMouseStore();

const size = computed<[number, number]>(() => game.level?.size ?? [4, 4]);

const gridSize = computed(() => size.value.map(s => s * settings.squareSize));

const squares = computed(() => {
    const squares = [];
    for (let y = 0; y < size.value[1]; y++) {
        for (let x = 0; x < size.value[0]; x++) {
            squares.push({x, y});
        }
    }
    return squares;
});

const cars = computed(() => game.currentState?.carsPositions ?? []);

function onMouseup() {
    mouse.commitSelection();
}
function onMouseleave() {
    mouse.clearSelection();
}

</script>

<template>
    <div
        class="traffic-grid"
        @mouseup="onMouseup"
        @mouseleave="onMouseleave"
    >
        <TrafficGridCell
            v-for="(s, i) of squares"
            :key="i"
            :x="s.x"
            :y="s.y"
            :index="i"
        />

        <MovingCar
            v-for="car of cars"
            :key="car.car"
            :car="car"
        />

        <MovingCar
            v-if="mouse.stagedCar"
            :car="mouse.stagedCar"
            floating
        />
    </div>
</template>

<style>
.traffic-grid {
    background-color: var(--color-background-soft);
    width: v-bind("`${gridSize[0]}px`");
    height: v-bind("`${gridSize[1]}px`");

    display: grid;
    grid-template-columns: repeat(v-bind('size[0]'), 1fr);
    grid-template-rows: repeat(v-bind('size[1]'), 1fr);
}

</style>
