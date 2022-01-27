import { defineStore } from 'pinia';
import {ref, computed} from 'vue';

export const useGameSettingsStore = defineStore('game-settings', () => {
  const size = ref<[number, number]>([6, 6]);

  const squareSize = ref(80);
  const gridSize = computed(() => size.value.map(s => s * squareSize.value));

  return {
      size,
      squareSize,
      gridSize,
  };
})
