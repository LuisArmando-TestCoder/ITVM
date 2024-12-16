import { writable } from "svelte/store";
import type { Item, User } from "./types";

// export let searchType = writable<"items" | "users">("items"); // Dropdown for search type

export const errorDisclaimer = writable<Error>()
export const takenItem = writable<Item>();
export const takenUser = writable<User>();

// export let selectedUser = writable<User | null>(null);
// export let selectedItem = writable<Item | null>(null);