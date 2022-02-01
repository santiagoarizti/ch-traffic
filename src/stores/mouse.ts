import {CarCode, cars} from '@/lib/cars';
import { getBoundingBox } from '@/lib/level-solver';
import { CarPosition } from '@/lib/levels';
import {defineStore} from 'pinia';
import {ref, computed, watch} from 'vue';
import { useGameStore } from './game';

export const useMouseStore = defineStore('mouse', () => {

    const game = useGameStore();

    const selectedCar = ref<CarCode>();

    const activeCell = ref<[number, number]>();

    /** when there is a selected car, show its coordinates via this computed */
    const selectedPos = computed((): CarPosition|undefined => {
        return game.currentState?.carsPositions.find(p => p.car === selectedCar.value);
    });

    const hoveredCar = computed((): CarCode|undefined => {
        if (!activeCell.value) return undefined;
        for (const pos of game.currentState?.carsPositions ?? []) {
            const car = cars.find(car => car.code === pos.car);
            if (!car) continue;

            const [x1, y1, x2, y2] = getBoundingBox(car, pos);
            for (let i = x1; i <= x2; i++) for (let j = y1; j <= y2; j++) {
                if (i === activeCell.value[0] && j === activeCell.value[1]) {
                    return pos.car;
                }
            }
        }
        return undefined;
    });

    const hoveredPos = computed(() => {
        return game.currentState?.carsPositions.find(p => p.car === hoveredCar.value);
    });

    //watch(hoveredCar, v => selectedCar.value = v);

    function selectHoveredCar() {
        selectedCar.value = hoveredCar.value;
    }

    function clearSelection() {
        selectedCar.value = undefined;
    }

    function clearActiveCell() {
        activeCell.value = undefined;
    }

    function reportCoordinates(x: number, y: number) {
        activeCell.value = [x, y];
    }

    return {
        // state
        activeCell,
        // getters
        selectedPos,
        hoveredPos,
        // actions
        selectHoveredCar,
        clearSelection,
        clearActiveCell,
        reportCoordinates,
    };
});
