<script setup lang="ts">

import TrafficGrid from '@/components/TrafficGrid.vue';
import {useGameStore} from '@/stores/game';
import LevelSelector from '@/components/LevelSelector.vue';
import SolutionNavigator from '@/components/SolutionNavigator.vue';
import { useGameSettingsStore } from '@/stores/gameSettings';
import { useMouseStore } from '@/stores/mouse';

const store = useGameStore();
const settings = useGameSettingsStore();
const mouse = useMouseStore();

// load the standard levels into the store.
store.initStandardLevels();

</script>

<template>
<div>
    <h2>Game</h2>

    <LevelSelector />

    <div class="grid-container">
        <TrafficGrid />
    </div>

    <div v-if="settings.showMouseDebug">
        <h3>Debug</h3>
        Selected car: {{ mouse.selectedCar }}<br>
        Current location: __<br>
        Hover location: __<br>
        Is new location valid: __<br>
    </div>

    <SolutionNavigator />
</div>
</template>

<style scoped>
.grid-container {
    display: flex;
    justify-content: center;
    margin: 2rem;
}
</style>
