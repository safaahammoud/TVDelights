import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

import CarouselSlider from '../src/components/Carousel/CarouselSlider.vue';


describe('CarouselSlider', () => {
  test('mount component', async () => {
    expect(CarouselSlider).toBeTruthy();
    
    const wrapper = mount(CarouselSlider, {
      props: {
        list: [{
          name: 'test',
          image: '',
          genres: ['comedy'],
          rating: '6'
        }]
      }
    });
  
    expect(wrapper.html()).toMatchSnapshot();
  });
});
