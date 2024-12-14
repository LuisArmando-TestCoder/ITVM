// store.ts
import { writable } from 'svelte/store';

// Define the shape of the store's state
interface ComponentState {
  id: number | null;
  isOpen: boolean;
}

// Create a writable store for the global state with an initial state
export const componentState = writable<ComponentState>({ id: null, isOpen: false });