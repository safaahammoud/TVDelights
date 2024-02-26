import { describe, expect, vi, beforeEach, test } from 'vitest';
import { useRouter, createRouter, createWebHistory } from 'vue-router';
import { mount } from '@vue/test-utils';

import CarouselSlider from '@/components/Carousel/CarouselSlider.vue';

vi.mock('vue-router');

describe('CarouselSlider', () => {
  let wrapper;
  let router;
  useRouter.mockReturnValue({
    push: vi.fn(),
  });

  beforeEach(() => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/show/:id',
          name: 'tv-show-details',
          component: () => import('@/views/TVShowsDetails.vue')
        },
      ],
    });

    useRouter().push.mockReset();
    wrapper = mount(CarouselSlider, {
      props: {
        list: [{
          id: 1,
          image: {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/0/73.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/0/73.jpg"
          },
          name: "Glee",
          rating: 5,
          genres: [    
            "Drama",
            "Music",
            "Romance"
          ],
          navigateTo: { name: 'tv-show-details', params: { id: 1 } },
        }],
      },
      global: {
        plugins: [router],
      },
    
    });
  });


  test('renders PrimeCarousel and PrimePaginator components properly', async () => {
    await wrapper.find('router-link').trigger('click');
    await router.isReady();

    expect(useRouter().push).toHaveBeenCalledWith({
      name: 'tv-show-details',
      params: { id: 1 }
    });
  });

  test('emits changePage event when PrimePaginator emits page event', async () => {
    const primePaginator = wrapper.findComponent({ name: 'PrimePaginator' });

    await primePaginator.vm.$emit('page', { page: 2 });

    expect(wrapper.emitted('changePage')).toBeTruthy();
    expect(wrapper.emitted('changePage')).toHaveLength(1);
    
    expect(wrapper.emitted('changePage')[0]).toEqual([3]);
  });
});
