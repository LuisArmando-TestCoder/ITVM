import { get, type Writable } from "svelte/store";

export default function toggleObjects(
    objectsToggles: Writable<{
        [index: string]: boolean;
    }>,
    displayedObjectId: string,
) {
    objectsToggles.set({
        ...get(objectsToggles),
        [displayedObjectId]: !get(objectsToggles)[displayedObjectId],
    });
}