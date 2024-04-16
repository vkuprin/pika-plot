export interface ApiListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface NamedApiResource {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  url: string;
  stats: Stat[];
}

interface StatDetail {
  name: string;
}

interface Stat {
  base_stat: number;
  stat: StatDetail;
}

