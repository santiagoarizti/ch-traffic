import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useGameSettingsStore = defineStore('game-settings', () => {

    /** in pixels, to know how big to render the grid. */
    const squareSize = ref(80);

    /** should we show game coordinates (perhaps this is too debuggy) */
    const showCoordinates = ref(false);

    /** show the event fires of mouse stuff, plus show the selected car */
    const showMouseDebug = ref(false);

    /** should we display the letter codes in cars and show the solution? */
    const showSolution = ref(false);

    return {
        squareSize,
        showCoordinates,
        showMouseDebug,
        showSolution,
    };
});
