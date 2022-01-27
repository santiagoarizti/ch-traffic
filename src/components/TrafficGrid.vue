<script setup lang="ts">
import { useGameSettingsStore } from '@/stores/gameSettings';
import {ref, toRefs, computed} from 'vue';

const store = useGameSettingsStore();

const {size, gridSize} = toRefs(store);

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

const showCoordenates = ref(false);

</script>

<template>
    <div class="traffic-grid">
        <span
            class="tg-square"
            v-for="(s, i) of squares"
            :key="i"
            :style="{'--col': s.y + 1, '--row': s.x + 1}"
        >
            <span v-if="showCoordenates">
                {{i}}<br>
                ({{s.x}}, {{s.y}})
            </span>
        </span>
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
    /*width: v-bind("`${squareSize}px`");
    height: v-bind("`${squareSize}px`");*/
    grid-column: var(--col) / span 1;
    grid-row: var(--row) / span 1;
}
</style>
