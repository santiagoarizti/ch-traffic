import { describe, it, expect, beforeAll } from 'vitest'

import { mount } from '@vue/test-utils'
import TrafficGrid from '../TrafficGrid.vue'
import { createPinia } from 'pinia'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(TrafficGrid, {global: {plugins: [createPinia()]}});
  })
})
