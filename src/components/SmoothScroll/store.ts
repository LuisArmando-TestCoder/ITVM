// src/stores/valueStore.ts
import { writable } from 'svelte/store';

// Create a writable store named "value" with an initial value of null or any default value you prefer
export const viewport = writable<HTMLElement>();
export const Y = writable<number>(0);