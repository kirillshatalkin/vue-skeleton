import { describe, it, expect } from 'vitest';
import ElementPlus from 'element-plus';

import { mount } from '@vue/test-utils';
import AddItemForm from '../AddItemForm.vue';

describe('AddItemForm', () => {
    it('renders properly', () => {
        const wrapper = mount(AddItemForm, {
            global: {
                plugins: [ElementPlus],
            },
        });
        expect(wrapper.text()).toContain('Price');
    });
});
