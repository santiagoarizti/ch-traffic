import {getStandardLevels} from '@/lib/level-loader';
import {applyMove, LevelSnapshot} from '@/lib/level-solver';
import {GameLevel, Move} from '@/lib/levels';
import {defineStore} from 'pinia';
import {ref, computed, watch} from 'vue';
// import {useGameSettingsStore} from '@/stores/gameSettings';

export const useGameStore = defineStore('game', () => {

    // const settings = useGameSettingsStore();

    // should be already parsed and validated.
    const levels = ref<GameLevel[]>([]);

    function initStandardLevels() {
        levels.value = getStandardLevels();
    }

    const activeLevelId = ref<number|undefined>();

    const level = computed<GameLevel|undefined>(() => levels.value.find(l => l.id === activeLevelId.value));

    const state = ref<LevelSnapshot[]>();

    // when the level changes, reset the progress
    watch(level, v => {
        state.value = v ? [{
            carsPositions: v.carsPositions,
            moves: [],
        }] : undefined;
    });


    function loadLevel(id: number) {
        activeLevelId.value = id;
    }

    function makeMove(move: Move) {
    //     applyMove();
    }

    return {
        // state
        levels,
        // getters
        level,
        // actions
        initStandardLevels,
        loadLevel,
        makeMove,
    };
});
