import { writable } from "svelte/store";

export const repos = writable<Repo[] | undefined>(undefined);

enum SortOrder {
  CREATED = "created",
  UPDATED = "updated",
  PUSHED = "pushed",
  FULL_NAME = "full_name"
}

enum SortDirection {
  ASC = "asc",
  DESC = "desc"
}

export interface Repo {
  id: string;
  name: string;
  description: string;
  html_url: string;
  watchers_count: number;
}

export function loadRepos(
  sort: SortOrder = SortOrder.FULL_NAME,
  direction: SortDirection = SortDirection.ASC
): void {
  fetch(`https://api.github.com/users/Rich-Harris/repos?sort=${sort}&direction=${direction}`)
    .then(response => response.json())
    .then(json => repos.set(json));
}

loadRepos(SortOrder.UPDATED, SortDirection.DESC);
