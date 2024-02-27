import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

import CarouselSliderItem from '../src/components/Carousel/CarouselSliderItem.vue';

describe('CarouselSliderItem', () => {
  test('mount component and renders properly', async () => {
    const mockItem = {
      name: 'test',
      image: 'test-image-url',
      genres: ['comedy'],
      rating: 6,
    };
    const wrapper = mount(CarouselSliderItem, {
      props: mockItem,
    });
    
    expect(wrapper.find('h3').text()).toContain(mockItem.name);
    expect(wrapper.find('.carousel__item__image-wrapper__image').attributes('src')).toBe('test-image-url');
    expect(wrapper.find('.carousel__item__rating').text()).toContain('6');
  });
});
