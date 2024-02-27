import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import StarRating from '../src/components/StarRating.vue';

describe('StarRating', () => {
  test('renders properly', () => {
    const rating = 8;
    const wrapper = mount(StarRating, {
      props: {
        rating,
      }
    });
    const ratingText = wrapper.find('.rating-wrapper__rating').text();

    expect(ratingText).toBe(rating.toString());
  });

  test('applies the provided styleClass when styleClass prop is provided', async () => {
    const rating = 4;
    const styleClass = 'redColor';
    const wrapper = mount(StarRating, {
      props: {
        rating,
        styleClass,
      },
    });

    expect(wrapper.classes()).toContain('rating-wrapper');
    expect(wrapper.classes()).toContain(styleClass);
  });
});
