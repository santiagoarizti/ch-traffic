import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useGameSettingsStore = defineStore('game-settings', () => {

    const squareSize = ref(80);

    // should we show game coordenates (perhaps this is too debuggy)
    const showCoordenates = ref(false);

    return {
        squareSize,
        showCoordenates,
    };
});
