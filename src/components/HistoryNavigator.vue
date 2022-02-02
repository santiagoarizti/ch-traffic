<script setup lang="ts">

import {useGameStore} from '@/stores/game';
import {computed} from 'vue';

const game = useGameStore();

const history = computed(() => game.currentState?.moves);

function onClick(e: MouseEvent) {
    e.preventDefault();
    alert('what?');
}

</script>

<template>
    <div>
        Moves:<br>
        <span v-if="history">
            <span
                v-for="(move, i) of history"
                :key="move"
            >
                <a href="#" @click="onClick">
                    {{ move }}
                </a>
                <span v-if="i + 1 < history.length">,
                </span>
            </span>
        </span>
    </div>
</template>

<style scoped>
</style>
