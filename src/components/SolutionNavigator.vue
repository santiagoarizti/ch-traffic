<script setup lang="ts">

import {Move} from '@/lib/levels';
import {useGameStore} from '@/stores/game';
import {useGameSettingsStore} from '@/stores/gameSettings';
import {computed} from 'vue';

interface SolutionStep {
    move: Move,
}

const store = useGameStore();
const settings = useGameSettingsStore();

const solutionSteps = computed<SolutionStep[]|undefined>(() => {
    return store.level?.solution?.map(s => ({
        move: s,
    }));
});

// this will not work like this forever, we must for now sipmly execute said move.
function goToStep(move: Move) {
    store.makeMove(move);
}

</script>

<template>
    <div class="solution-navigator">
        <div>
            <label>
                <input type="checkbox" v-model="settings.showSolution">
                Show solution
            </label>
        </div>
        <div v-if="settings.showSolution">
            <div v-if="solutionSteps">
                <span
                    v-for="(ss, i) of solutionSteps"
                    :key="ss.move"
                >
                    <a href="#" @click.prevent="goToStep(ss.move)">
                        {{ss.move}}
                    </a>
                    <span v-if="i + 1 < solutionSteps.length">,
                    </span>
                </span>
            </div>
            <div v-else>
                Select a level with a solution
            </div>
        </div>
    </div>
</template>

<style scoped>

.solution-navigator {

}

</style>
