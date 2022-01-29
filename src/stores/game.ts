import {GameLevel, getStandardLevels} from '@/lib/levels';
import {defineStore} from 'pinia';
import {ref, computed} from 'vue';

export const useGameStore = defineStore('game', () => {

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
        levels,
        level,
        initStandardLevels,
        loadLevel,
    };
});
