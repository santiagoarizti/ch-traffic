<script setup lang="ts">

import {ref, computed} from 'vue';
import {useGameStore} from '@/stores/game';


const store = useGameStore();

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
    <div class="level-selector">
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
    </div>
</template>

<style scoped>

.level-selector {

}

</style>
