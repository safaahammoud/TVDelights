import type { RouteRecord } from "vue-router";

export type Schedule = {
    time: string;
    days: string[];
};

export type Rating = {
    average?: number;
};

export type Country = {
    name: string;
    code: string;
    timezone: string;
}

export type Network = {
    id: number;
    name: string;
    country: Country;
    officialSite?: string;
}
  
export type WebChannel = {
    id: number;
    name: string;
    country: Country;
    officialSite: string;
};
  
export type Externals = {
    tvrage?: number;
    thetvdb?: number;
    imdb?: string;
};

export type Image = {
    medium: string;
    original?: string;
};

export type Self = {
    href: string;
};

export type Episode = {
    href: string;
};

export type Links = {
    self: Self;
    nextepisode?: Episode;
    previousepisode?: Episode;
};

export type TVShow = {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime?: number;
    averageRuntime?: number;
    premiered: string;
    ended?: string;
    officialSite?: string;
    schedule: Schedule;
    rating: Rating;
    weight: number;
    network?: Network;
    webChannel?: WebChannel;
    dvdCountry: null;
    externals: Externals;
    image: Image;
    summary: string;
    updated: number;
    _links: Links;
};

export type TVShowListDetails = {
    show: TVShow;
    score: number;
};

export type Person = {
    id: number;
    url: string;
    name: string;
    country: Country;
    birthday?: string;
    deathday: null;
    gender: string;
    image: Image;
    updated: number;
    _links: { self: Self };
}

export type Character = {
    id: number;
    url: string;
    name: string;
    image?: Image;
    _links: { self: Self };
}

export type Cast = {
    person: Person;
    character: Character;
    self: boolean;
    voice: boolean;
}

export type Embedded = {
  episodes: Episode[];
  cast: Cast[];
}

export type TVShowCard = {
    id: number;
    image: string;
    name: string;
    rating: number;
    genres: string[];
    navigateTo: Partial<RouteRecord>;
}

export type TVShowsListApi = TVShowListDetails[];

export type TVShowDetailsApi = TVShow & {
    _embedded: Embedded;
}

export type FetchAllTVShowsQuery = {
    page?: number;
    search?: string;
}