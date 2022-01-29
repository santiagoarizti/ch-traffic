<script setup lang="ts">

import TrafficGrid from '@/components/TrafficGrid.vue';
import {useGameStore} from '@/stores/game';
import {ref, computed} from 'vue';

const store = useGameStore();
// load the standard levels into the store.
store.initStandardLevels();

// just initial value
const selectedLevel = ref(store.level?.id);

function loadLevel() {
    if (selectedLevel.value != null) {
        store.loadLevel(selectedLevel.value);
    }
}

const disableSubmit = computed(() => selectedLevel.value == null);

</script>

<template>
<div>
    <h2>Game</h2>

    <label>
        Level select:
        <select
            v-model.number="selectedLevel"
        >
            <option disabled>
                Select a level
            </option>
            <option
                v-for="level of store.levels"
                :key="level.id"
                :value="level.id"
            >
                {{ level.id }}:
                {{ level.name }}
            </option>
        </select>
    </label>
    <button
        @click="loadLevel"
        :disabled="disableSubmit"
    >
        load
    </button>

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
