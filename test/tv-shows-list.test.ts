import { nextTick } from 'vue';
import { vi, describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import TVShowsList from '@/views/TVShowsList.vue'; // Adjust the path as per your project structure
import debounce from '@/utils/debounce.util';

const mockDebounce = vi.fn().mockImplementation(debounce);

const mockTVShowStore = {
  tvShowsCards: [],
  fetchAllTVShows: vi.fn(),
};

const wrapper = mount(TVShowsList, {
  global: {
    provide: {
      useTVShowStore: () => mockTVShowStore,
    },
  },
});

describe('TVShowsList', () => {
  test('fetches all TV shows on mounted', () => {
    expect(mockTVShowStore.fetchAllTVShows).toHaveBeenCalled();
    expect(mockTVShowStore.fetchAllTVShows).toHaveBeenCalledTimes(1);
  });

  test('calls debounce function on keyup event', async () => {
    const searchInput = wrapper.find('.searchInput');

    await searchInput.trigger('keyup');
    await nextTick();

    expect(mockDebounce).toHaveBeenCalledTimes(1);

    const debouncedFunction = mockDebounce.mock.calls[0][0];
    await debouncedFunction({ target: { value: 'search query' } });

    expect(mockTVShowStore.fetchAllTVShows).toHaveBeenCalledWith({ search: 'search query' });
  });
});
