import { writable } from "svelte/store";
import type { Inventory, User } from "./types";

export const states = ["new", "consumed", "fixed", "broken"] as const;

export const categories = ["0", "1", "2"] as const;

export const users = writable<User[]>([
    {
        name: "User-0",
        id: "d65679e1-e8a4-46e7-a67a-e43c773b76e3",
        userType: {
            name: "viewer",
            permissions: ["read"]
        },
        currentItemsIds: []
    },
    {
        name: "User-1",
        id: "ff0856f6-6360-4d77-8f66-f25d407a937e",
        userType: {
            name: "admin",
            permissions: ["read", "update", "create"]
        },
        currentItemsIds: []
    },
    {
        name: "User-2",
        id: "94486d31-924f-474b-85f5-e3906378ea69",
        userType: {
            name: "owner",
            permissions: ["read", "update", "create", "delete"]
        },
        currentItemsIds: []
    },
    {
        name: "User-3",
        id: "d18112af-5c6c-4ff5-930c-614a69a62744",
        userType: {
            name: "owner",
            permissions: ["read", "update", "create", "delete"]
        },
        currentItemsIds: []
    },
    {
        name: "User-4",
        id: "4fb0a0db-b58b-41d6-b0eb-4d64febc01f7",
        userType: {
            name: "editor",
            permissions: ["read", "update"]
        },
        currentItemsIds: []
    }
]);

export const inventory = writable<Inventory>({
    id: "inventory-001",
    items: [
        {
            category: "0", // Example category
            name: "Laptop",
            id: "e28133bc-d4cb-4771-a27b-86901ea61d9c",
            price: 0, // Borrowed item
            state: "new",
            movements: []
        },
        {
            category: "1", // Example category
            name: "Projector",
            id: "461cb688-ce67-4bf0-be82-be57ae324723",
            price: 0, // Borrowed item
            state: "consumed",
            movements: []
        },
        {
            category: "2", // Example category
            name: "Camera",
            id: "d3bd4f28-b870-46bb-a3a2-9f545546a224",
            price: 0, // Borrowed item
            state: "new",
            movements: []
        },
        {
            category: "1",
            name: "Whiteboard",
            id: "f949b592-711f-430e-8223-43025f967c33",
            price: 0, // Borrowed item
            state: "fixed",
            movements: []
        }
    ]
});
