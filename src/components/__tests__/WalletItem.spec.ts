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
            },
            global: {
                plugins: [ElementPlus],
            },
        });
        expect(wrapper.text()).toContain('test title');
    });
});
