<script setup lang="ts">
import TrafficGrid from '@/components/TrafficGrid.vue';

</script>

<template>
<div>
    <h2>Game</h2>

    <label>
        Level select:
        <select>

        </select>
    </label>

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
