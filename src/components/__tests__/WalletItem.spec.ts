import { describe, it, expect } from 'vitest';
import ElementPlus from 'element-plus';

import { mount } from '@vue/test-utils';
import WalletItem from '../WalletItem.vue';

describe('WalletItem', () => {
    it('renders properly', () => {
        const wrapper = mount(WalletItem, {
            props: {
                title: 'test title',
                date: new Date(),
                category: 'test category',
                price: 123,
            },
            global: {
                plugins: [ElementPlus],
            },
        });
        expect(wrapper.text()).toContain('test title');
        expect(wrapper.text()).toContain('test category');
        expect(wrapper.text()).toContain('123');
    });
});
