<script setup lang="ts">

import {ref, computed} from 'vue';
import {useGameStore} from '@/stores/game';


const store = useGameStore();

// just initial value
const selectedLevel = ref(store.level?.id);

function onClick() {
    if (selectedLevel.value != null) {
        store.loadLevel(selectedLevel.value);
    }
}
function onChange() {
    if (selectedLevel.value != null) {
        store.loadLevel(selectedLevel.value);
    }
}

const disableSubmit = computed(() => selectedLevel.value == null);

</script>

<template>
    <div class="level-selector">
        <label>
            <select
                v-model.number="selectedLevel"
                @change="onChange"
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
            @click="onClick"
            :disabled="disableSubmit"
        >
            Reset
        </button>
    </div>
</template>

<style scoped>

.level-selector {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

</style>
