import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import { CONTACT_US_LINK } from '@/consts/links.const';
import PageNotFound from '@/views/PageNotFound.vue';

describe('PageNotFound', () => {
  test('renders properly', () => {
    const wrapper = mount(PageNotFound);
    const contactUsLink = CONTACT_US_LINK;

    expect(wrapper.find('h1').text()).toContain('Not Found');
    expect(wrapper.find('h3').text()).toContain('This page doesnt exist.');
    
    const paragraph = wrapper.find('p');
    const link = paragraph.find('a');

    expect(paragraph.exists()).toBe(true);
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe(contactUsLink);
  });
});
