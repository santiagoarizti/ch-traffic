import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useGameSettingsStore = defineStore('game-settings', () => {

    const squareSize = ref(80);

    return {
        squareSize,
    };
});
