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

    const history = ref<LevelSnapshot[]>();

    // when the level changes, reset the progress
    watch(level, () => resetLevel());

    const currentState = computed(() => history.value?.at(-1));

    /**
     * load a level (or reset the current one
     */
    function loadLevel(id: number) {
        if (activeLevelId.value === id) {
            resetLevel();
        } else {
            activeLevelId.value = id;
        }
    }

    function resetLevel() {
        history.value = level.value ? [{
            carsPositions: level.value.carsPositions,
            moves: [],
        }] : undefined;
    }

    function makeMove(move: Move) {
        if (currentState.value) {
            try {
                const newState = applyMove(currentState.value, move);
                history.value?.push(newState);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return {
        // state
        levels,
        // getters
        level,
        currentState,
        // actions
        initStandardLevels,
        loadLevel,
        makeMove,
    };
});
