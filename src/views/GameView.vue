<script setup lang="ts">

import TrafficGrid from '@/components/TrafficGrid.vue';
import {useGameStore} from '@/stores/game';
import LevelSelector from '@/components/LevelSelector.vue';
import SolutionNavigator from '@/components/SolutionNavigator.vue';

const store = useGameStore();
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
