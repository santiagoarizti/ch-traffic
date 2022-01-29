import {GameLevel, getStandardLevels} from '@/lib/levels';
import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
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

    function loadLevel(id: number) {
        activeLevelId.value = id;
    }

    return {
        // state
        levels,
        // getters
        level,
        // actions
        initStandardLevels,
        loadLevel,
    };
});
