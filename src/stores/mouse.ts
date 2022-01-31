import {CarCode} from '@/lib/cars';
import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useMouseStore = defineStore('mouse', () => {

    const selectedCar = ref<CarCode>();

    function selectCar(car: CarCode) {
        selectedCar.value = car;
    }

    function clearSelection() {
        selectedCar.value = undefined;
    }

    return {
        // state
        selectedCar,
        // actions
        selectCar,
        clearSelection,
    };
});
