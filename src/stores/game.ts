import { cars } from '@/lib/cars';
import {getStandardLevels} from '@/lib/level-loader';
import {applyMove, isLevelBeat, LevelSnapshot, tryMove} from '@/lib/level-solver';
import {GameLevel, Move} from '@/lib/levels';
import {defineStore} from 'pinia';
import {ref, computed, watch} from 'vue';

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
        if (currentState.value && level.value) {
            try {
                const newState = tryMove(level.value, currentState.value, cars, move);
                history.value?.push(newState);
                if (isLevelBeat(level.value, newState, cars)) {
                    alert('You win :)');
                }
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
