<script setup lang="ts">

import { useGameSettingsStore } from '@/stores/gameSettings';
import { useMouseStore } from '@/stores/mouse';

const settings = useGameSettingsStore();
const mouse = useMouseStore();

</script>

<template>
    <div v-if="settings.showMouseDebug">
        <h3>Debug</h3>
        Selected car: {{ mouse.selectedPos ? mouse.selectedPos : '__' }}
        <br>
        Hover location: {{ mouse.activeCell || '__' }}<br>
        Is new location valid: __<br>
    </div>
</template>

<style scoped>
</style>
