<script setup lang="ts">
import {useGameStore} from '@/stores/game';
import {useGameSettingsStore} from '@/stores/gameSettings';
import {useMouseStore} from '@/stores/mouse';
import {computed} from 'vue';
import MovingCar from './MovingCar.vue';
import TrafficGridCell from './TrafficGridCell.vue';
import {cars, Car} from '@/lib/cars';

const game = useGameStore();
const settings = useGameSettingsStore();
const mouse = useMouseStore();

// size of playable level, this determines the area where cars will be rendered
const size = computed<[number, number]>(() => game.level?.size ?? [4, 4]);

// this size accounts for the space that needs to be outside of the grid to allow for the winning car
const sizeExtra = computed(() => {
    return [size.value[0] + 1, size.value[1]];
});

// size in pixels based on squareSize (ignored on smaller screens)
const gridSize = computed(() => sizeExtra.value.map(s => s * settings.squareSize) as [number, number]);

// width to height ratio. because of the padding-top hack, we need to know the height in terms of the width
const whRatio = computed(() => Math.floor(100 * gridSize.value[1] / gridSize.value[0]) + '%');

// these are the grid squares that trigger mouse events
const squares = computed(() => {
    const squares = [];
    // normal squares for game
    for (let y = 0; y < size.value[1]; y++) {
        for (let x = 0; x < size.value[0]; x++) {
            squares.push({x, y});
        }
    }
    // add a couple extra grid cells for the exit car
    if (game.level?.exit) {
        const x = size.value[0];
        const y = game.level.exit[0];
        squares.push({x, y});
    }
    return squares;
});

// cars catalog
const positions = computed(() => game.currentState?.carsPositions ?? []);

// global handlers to reset some stuff, todo: move to better place
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
        <div class="cnt1">
            <div class="cnt2">
                <TrafficGridCell
                    v-for="(s, i) of squares"
                    :key="i"
                    :x="s.x"
                    :y="s.y"
                    :index="i"
                />

                <MovingCar
                    v-for="pos of positions"
                    :key="pos.car"
                    :car="pos"
                />

                <MovingCar
                    v-if="mouse.stagedCar"
                    :car="mouse.stagedCar"
                    floating
                />
            </div>
        </div>
    </div>
</template>

<style>
.traffic-grid {
    /* width: v-bind("`${gridSize[0]}px`"); */
    /*height: v-bind("`${gridSize[1]}px`");*/
    max-width: v-bind("`${gridSize[0]}px`");
    width: 100%;
}
.cnt1 {
    width: 100%;
    padding-top: v-bind(whRatio);
    position: relative;
}
.cnt2 {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: grid;
    grid-template-columns: repeat(v-bind('sizeExtra[0]'), 1fr);
    grid-template-rows: repeat(v-bind('sizeExtra[1]'), 1fr);
}

</style>
