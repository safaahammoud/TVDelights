import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';

import { useTVShowStore } from '../src/stores/TVShowStore';
import * as util from '../src/utils/debounce.util';
import TVShowsList from '../src/views/TVShowsList.vue';

describe('TVShowsList', () => {
  const wrapper = mount(TVShowsList, {
    global: {
      plugins: [createTestingPinia()],
    },
    stubs: [PrimeVue]
  });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('fetches all TV shows on mounted', async () => {
    const store = useTVShowStore();
    vi.spyOn(store, 'fetchAllTVShows');

    await store.fetchAllTVShows();

    expect(store.fetchAllTVShows).toHaveBeenCalledTimes(1);
    expect(store.tvShowsCards).toHaveLength(245);        
  });

  test.skip('calls debounce function on keyup event', async () => {
    const store = useTVShowStore();
    const getDebounceSpy = vi.spyOn(util, 'default');
    const searchInput = wrapper.find('.searchInput');
    vi.useFakeTimers();
    vi.spyOn(store, 'fetchAllTVShows');

    const inputElement = searchInput.element as HTMLInputElement;
    inputElement.value = 'search query';

    await searchInput.trigger('input');
    await searchInput.trigger('keyup');
    await nextTick();

    expect(getDebounceSpy.mock.calls.length).toBe(1);
    expect(store.fetchAllTVShows).toHaveBeenCalledWith({ search: 'search query' });
  });
});
