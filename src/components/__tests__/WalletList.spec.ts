import { describe, it, expect } from 'vitest';
import ElementPlus from 'element-plus';

import { mount } from '@vue/test-utils';
import WalletList from '../WalletList.vue';

describe('WalletList', () => {
    it('renders properly', () => {
        const wrapper = mount(WalletList, {
            props: {
                items: [
                    {
                        id: 1,
                        title: 'test title',
                        date: new Date(),
                        categoryId: 1,
                        category: 'category',
                        price: 100,
                    },
                ],
            },
            global: {
                plugins: [ElementPlus],
            },
        });
        expect(wrapper.text()).toContain('test title');
        expect(wrapper.text()).toContain('category');
        expect(wrapper.text()).toContain('100');
    });
});
