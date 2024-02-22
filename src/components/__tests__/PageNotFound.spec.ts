import { describe, it, expect } from 'vitest';
;
import { mount } from '@vue/test-utils';
import PageNotFound from '@/views/PageNotFound.vue';

describe('PageNotFound', () => {
  it('renders properly', () => {
    const wrapper = mount(PageNotFound);
    const contactUsLink = 'https://www.abnamro.nl/en/personal/contact/index.html';

    expect(wrapper.find('h1').text()).toContain('Not Found');
    expect(wrapper.find('h3').text()).toContain('This page doesnt exist.');
    
    const paragraph = wrapper.find('p');
    const link = paragraph.find('a');

    expect(paragraph.exists()).toBe(true);
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe(contactUsLink);
  });
});
