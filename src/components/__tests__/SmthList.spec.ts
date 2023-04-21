import { describe, it, expect } from 'vitest';
import ElementPlus from 'element-plus';

import { mount } from '@vue/test-utils';
import SmthList from '../SmthList.vue';

describe('SmthList', () => {
    it('renders properly', () => {
        const wrapper = mount(SmthList, {
            props: {
                items: [
                    {
                        id: 1,
                        prop: 'test prop',
                    },
                ],
            },
            global: {
                plugins: [ElementPlus],
            },
        });
        expect(wrapper.text()).toContain('test prop');
    });
});
