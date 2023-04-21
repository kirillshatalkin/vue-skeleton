import { describe, it, expect } from 'vitest';
import ElementPlus from 'element-plus';

import { mount } from '@vue/test-utils';
import SmthItem from '../SmthItem.vue';

describe('SmthItem', () => {
    it('renders properly', () => {
        const wrapper = mount(SmthItem, {
            props: {
                prop: 'test prop',
            },
            global: {
                plugins: [ElementPlus],
            },
        });
        expect(wrapper.text()).toContain('test prop');
    });
});
