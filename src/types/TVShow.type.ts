export type Schedule = {
    time: string;
    days: string[];
};

export type Rating = {
    average?: number;
};

export type Network = {
    id: number;
    name: string;
    country: Country;
    officialSite?: string;
}
  
export type Country = {
    name: string;
    code: string;
    timezone: string;
}
  
export type WebChannel = {
    id: number;
    name: string;
    country: any;
    officialSite: string;
};
  
export type Externals = {
    tvrage?: number;
    thetvdb?: number;
    imdb?: string;
};

export type Image = {
    medium: string;
    original: string;
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
  dvdCountry: any;
  externals: Externals;
  image: Image;
  summary: string;
  updated: number;
  _links: Links;
};

type TVShowDetails = {
    show: TVShow;
    score: number;
};

export type TVShowsListApi = TVShowDetails[];
