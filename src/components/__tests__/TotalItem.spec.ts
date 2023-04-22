import { describe, it, expect } from 'vitest';
import ElementPlus from 'element-plus';

import { mount } from '@vue/test-utils';
import TotalItem from '../TotalItem.vue';

describe('TotalItem', () => {
    it('renders properly', () => {
        const wrapper = mount(TotalItem, {
            props: {
                price: 123,
            },
            global: {
                plugins: [ElementPlus],
            },
        });
        expect(wrapper.text()).toContain('123');
    });
});
