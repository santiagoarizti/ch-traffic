import {describe, it} from 'vitest';

import {mount} from '@vue/test-utils';
import TrafficGrid from '../TrafficGrid.vue';
import {createPinia} from 'pinia';

describe('HelloWorld', () => {
    it('renders properly', () => {
        mount(TrafficGrid, {global: {plugins: [createPinia()]}});
    });
});
