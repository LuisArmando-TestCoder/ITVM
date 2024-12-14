// store.d.ts
declare module './store' {
    // Define the shape of the store's state
    export interface ComponentState {
      id: number | null;
      isOpen: boolean;
    }
  
    // Export the store
    import { Writable } from 'svelte/store';
    export const componentState: Writable<ComponentState>;
  }