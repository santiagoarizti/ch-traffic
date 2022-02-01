import {CarCode, cars} from '@/lib/cars';
import {getBoundingBox} from '@/lib/level-solver';
import {CarPosition, Move} from '@/lib/levels';
import {defineStore} from 'pinia';
import {ref, computed, watch} from 'vue';
import {useGameStore} from './game';

export const useMouseStore = defineStore('mouse', () => {

    const game = useGameStore();

    /** if mouse is down in a cell with a car, this value is updated */
    const selectedCar = ref<CarCode>();

    /** grid cell under mouse, updated all the time regardless of clicks */
    const hoverCell = ref<[number, number]>();

    /** on the moment of click, the hover cell might not actually be the origin of the selected car, it could
     * be off by a couple of units, record this here. */
    const deltaOnClick = ref<[number, number]>();

    /** when there is a selected car, show its coordinates via this computed */
    const selectedPos = computed((): CarPosition|undefined => {
        return game.currentState?.carsPositions.find(p => p.car === selectedCar.value);
    });

    /** based on the active cell, find which car is below mouse if any */
    const hoveredCar = computed((): CarCode|undefined => {
        if (!hoverCell.value) return undefined;
        for (const pos of game.currentState?.carsPositions ?? []) {
            const car = cars.find(car => car.code === pos.car);
            if (!car) continue;

            const [x1, y1, x2, y2] = getBoundingBox(car, pos);
            for (let i = x1; i <= x2; i++) for (let j = y1; j <= y2; j++) {
                if (i === hoverCell.value[0] && j === hoverCell.value[1]) {
                    return pos.car;
                }
            }
        }
        return undefined;
    });

    /** if there is a hovered car, then this should yield the complete pos value */
    const hoveredPos = computed((): CarPosition|undefined => {
        return game.currentState?.carsPositions.find(p => p.car === hoveredCar.value);
    });

    /** should be displayed under the mouse when in the middle of a move */
    const stagedCar = computed((): CarPosition|undefined => {
        if (selectedPos.value && hoverCell.value && deltaOnClick.value) {
            const [ox, oy] = selectedPos.value.origin;

            // we need to consider the delta of actual origin minus active cell.
            const h = selectedPos.value.horizontal;
            const x = h ? hoverCell.value[0] - deltaOnClick.value[0] : ox;
            const y = h ? oy : hoverCell.value[1] - deltaOnClick.value[1];

            return {
                car: selectedPos.value.car,
                horizontal: h,
                origin: [x, y],
            };
        }
        return undefined;
    });

    // setting the delta on the moment of selection, helps to render a better stagedCar
    watch(selectedPos, v => {
        if (hoverCell.value && v) {
            const x = hoverCell.value[0] - v.origin[0];
            const y = hoverCell.value[1] - v.origin[1];
            deltaOnClick.value = [x, y];
        } else {
            deltaOnClick.value = undefined;
        }
    });

    /** called when a cell is clicked. the currently hovered car is marked as selected.
     * if not, just mark undefined, it is ok */
    function selectHoveredCar() {
        selectedCar.value = hoveredCar.value;
    }

    /** called when user is finished and wants to make the move */
    function commitSelection() {
        if (stagedCar.value && selectedPos.value) {

            // todo: extract these lines to function and unit-test
            const h = stagedCar.value.horizontal;
            const xory = h ? 0 : 1; // x or y
            const diff = stagedCar.value.origin[xory] - selectedPos.value.origin[xory];
            const dir = h ? (diff > 0 ? 'R' : 'L') : (diff > 0 ? 'D' : 'U');
            const am = Math.abs(diff); // move amount, remove sign because UDRL
            // don't commit the move if the amount moved was zero!
            if (am > 0) {
                const move: Move = `${stagedCar.value.car}${dir}${am}`;
                game.makeMove(move);
            }
        }
        // reset the car now that all went OK
        selectedCar.value = undefined;
    }

    /** called when user wants to cancel the action, such as exit screen */
    function clearSelection() {
        selectedCar.value = undefined;
        hoverCell.value = undefined;
    }

    /** called when the mouse is actively moving from one cell to another in hover state */
    function reportCoordinates(x: number, y: number) {
        hoverCell.value = [x, y];
    }

    return {
        // state
        hoverCell,
        // getters
        selectedPos,
        hoveredPos,
        stagedCar,
        // actions
        selectHoveredCar,
        clearSelection,
        commitSelection,
        reportCoordinates,
    };
});
