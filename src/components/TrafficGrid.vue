<script setup lang="ts">
import {useGameStore} from '@/stores/game';
import {useGameSettingsStore} from '@/stores/gameSettings';
import {useMouseStore} from '@/stores/mouse';
import {computed, ref, onBeforeUpdate} from 'vue';
import MovingCar from './MovingCar.vue';
import TrafficGridCell from './TrafficGridCell.vue';

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

// we need to find the cell elements to probe their location and find which cell is being touched,
// this would be unnecessary with mouseenter but there is no equivalent event in touch api
const cells = ref<InstanceType<typeof TrafficGridCell>[]>([]);

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
function onMouseup() { mouse.commitSelection(); }
function onMouseleave() { mouse.clearSelection(); }
function onTouchend() { mouse.commitSelection(); }
function onTouchcancel() { mouse.clearSelection(); }
function onTouchmove(e: TouchEvent) { // this shit is because touchmove doesn't trigger similar to mouseenter
    const {pageX: tx, pageY: ty} = e.touches[0]!; // touch x and y
    const {scrollTop: sy, scrollLeft: sx} = document.documentElement; // scroll x and y
    for (const c of cells.value) {
        if (c.$el instanceof HTMLElement) {
            const {x: rx, y: ry, width: rw, height: rh} = c.$el.getBoundingClientRect(); // rect x and y
            const [x1, y1] = [rx + sx, ry + sy]; // getting the bounding box
            const [x2, y2] = [x1 + rw, y1 + rh];
            // see if touch is currently above this cell.
            if (tx >= x1 && tx <= x2 && ty >= y1 && ty <= y2) {
                // see TrafficGridCell.vue::onMouseEnter for touch equivalent
                mouse.reportCoordinates(c.$props.x, c.$props.y);
                break;
            }
        }
    }
}

// ugly hack. I have vue 3.2.29, but in vue3.2.25+ this is not supposed to be necessary :(
onBeforeUpdate(() => cells.value = []);
function onRef(c: InstanceType<typeof TrafficGridCell>) { cells.value.push(c); }

</script>

<template>
    <div
        class="traffic-grid"
        @mouseup="onMouseup"
        @mouseleave="onMouseleave"
        @touchend="onTouchend"
        @touchmove="onTouchmove"
        @touchcancel="onTouchcancel"
    >
        <div class="cnt1">
            <div class="cnt2">
                <TrafficGridCell
                    v-for="(s, i) of squares"
                    :key="i"
                    :x="s.x"
                    :y="s.y"
                    :index="i"
                    :ref="onRef"
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
            <div
                v-if="game.levelBeat"
                class="win-msg"
                @touchstart.prevent.stop
            >
                <span>You win! :)</span>
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
    top: 0; right: 0; bottom: 0; left: 0;

    display: grid;
    grid-template-columns: repeat(v-bind('sizeExtra[0]'), 1fr);
    grid-template-rows: repeat(v-bind('sizeExtra[1]'), 1fr);
}
.win-msg {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.win-msg::before {
    content: "";
    display: inline-bock;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--color-background);
    opacity: 0.8
}

</style>
