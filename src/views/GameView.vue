<script setup lang="ts">
import {computed, toRefs} from 'vue';
import TrafficGrid from '@/components/TrafficGrid.vue';
import { useGameSettingsStore } from '@/stores/gameSettings';


const store = useGameSettingsStore();

const {size} = toRefs(store);

</script>

<template>
<div>
    <h2>Game</h2>
    size: (
        <input type="number" v-model="size[0]">,
        <input type="number" v-model="size[1]">
    )

    <div class="grid-container">
        <TrafficGrid />
    </div>
</div>
</template>

<style scoped>
.grid-container {
    display: flex;
    justify-content: center;
    margin: 2rem;
}
</style>
