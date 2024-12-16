import { get } from "svelte/store";
import { inventory, users } from "./Data";

export default function forceReRender() {
    // Reassign the same object to trigger reactivity

    users.update(() => JSON.parse(JSON.stringify(get(users))));
    inventory.update(() => JSON.parse(JSON.stringify(get(inventory))));
}