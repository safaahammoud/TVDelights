import { ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

import type {
    TVShow,
    TVShowCard,
    TVShowListDetails,
    FetchAllTVShowsQuery,
} from '@/types/TVShow.type';

export const useTVShowStore = defineStore('TVShowStore', () => {
    const isLoading = ref<boolean>(false);
    const tvShowsCards = ref<TVShowCard[]>([]);
    const backendUrl = import.meta.env.VITE_API_BACKEND_URL;

    async function fetchAllTVShows(query: FetchAllTVShowsQuery | null = null) {
        let url: string = '';
        let page: number = 1;
        let search: string = '';
        
        if (query) {
            page = query?.page || 1;
            search = query?.search || '';
        }

        if (search) {
            url = `${backendUrl}search/shows?q=${search}`;
        } else {
            url = `${backendUrl}shows?page=${page}`;
        }
        
        isLoading.value = true;
        
        const { data } = await axios.get<TVShow[]>(url)
            .finally(()=> {
                isLoading.value = false;
            });

        const formatTvShowItem = (tvShowItem: TVShowListDetails | TVShow): TVShowCard => {
            const id = ('show' in tvShowItem) ? tvShowItem.show.id : tvShowItem.id;
            const name = ('show' in tvShowItem) ? tvShowItem.show.name : tvShowItem.name;
            const image = ('show' in tvShowItem) ? tvShowItem.show.image?.original : tvShowItem.image.original;
            const genres = ('show' in tvShowItem) ? tvShowItem.show.genres : tvShowItem.genres;
            const rating = ('show' in tvShowItem) ? tvShowItem.show.rating?.average : tvShowItem.rating?.average;
            const navigateTo = { name: 'tv-show-details', params: { id } };

            return {
                id,
                name,
                navigateTo,
                image: image || '',
                rating: rating || 0,
                genres: genres.slice(0, 3),
            };
        };

        tvShowsCards.value = data.slice(0, 20).map(formatTvShowItem);
    }

    return {
        isLoading,
        tvShowsCards,
        fetchAllTVShows,
    };
});