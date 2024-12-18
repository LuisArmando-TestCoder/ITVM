import { writable } from "svelte/store";
import type { Inventory, User } from "./types";

export const states = ["nuevo", "arreglado", "dañado", "regular"] as const;

export const categories = ["Herramienta", "Electrónico", "Educación"] as const;

export const userTypeNames = ["estudiante", "editor", "admin", "profesor"] as const;

export const users = writable<User[]>([
    {
        name: "Vinicio",
        id: "92f5c83d-7641-4d63-b9eb-c7bbf7e3a451",
        userType: {
            name: "estudiante",
            permissions: ["read"]
        },
        currentItemsIds: []
    },
    {
        name: "Steve",
        id: "b1945b93-7a7e-4b3f-a917-1359d0fbb357",
        userType: {
            name: "editor",
            permissions: ["read", "update"]
        },
        currentItemsIds: []
    },
    {
        name: "Ary",
        id: "34c19a8c-ec65-4a82-a74c-1b4f5718f00f",
        userType: {
            name: "admin",
            permissions: ["read", "update", "create"]
        },
        currentItemsIds: []
    },
    {
        name: "Colindres",
        id: "a6c7a054-09b3-41f5-9c6e-63be5174b43f",
        userType: {
            name: "profesor",
            permissions: ["read", "update", "create", "delete"]
        },
        currentItemsIds: []
    },
    {
        name: "Carlos C",
        id: "e85bc3a9-7e9b-468e-9cfa-4417f27c8af4",
        userType: {
            name: "estudiante",
            permissions: ["read"]
        },
        currentItemsIds: []
    }
]);

export const inventory = writable<Inventory>({
    "id": "inventory-001",
    "items": [
        {
            "category": "Herramienta",
            "name": "Manguera para compresor",
            "id": "e728a92b-947f-4cb3-b0b8-7549df451122",
            "price": 25.0,
            "state": "nuevo",
            // "quantity": 2,
            "movements": []
        },
        {
            "category": "Herramienta",
            "name": "Extensiones con luz",
            "id": "cb05489b-d876-4d4b-893b-8c8e8a55ea48",
            "price": 15.0,
            "state": "nuevo",
            // "quantity": 4,
            "movements": []
        },
        {
            "category": "Herramienta",
            "name": "Extensiones medianas",
            "id": "4ebf7bd1-24c3-43f5-8f8a-4c5a41d3a4a2",
            "price": 12.0,
            "state": "nuevo",
            // "quantity": 3,
            "movements": []
        },
        {
            "category": "Herramienta",
            "name": "Prensas en C",
            "id": "9bc437e8-5baf-4bd7-b9f3-1546896bb927",
            "price": 30.0,
            "state": "nuevo",
            // "quantity": 4,
            "movements": []
        },
        {
            "category": "Herramienta",
            "name": "Engrasadora",
            "id": "b45f55f3-0fd8-432c-bb65-b0cb2b32f22a",
            "price": 50.0,
            "state": "nuevo",
            // "quantity": 1,
            "movements": []
        },
        {
            "category": "Herramienta",
            "name": "Juego de llaves de 10 piezas",
            "id": "3bd6e21c-7dbf-4fc4-80f2-2c30567ed378",
            "price": 40.0,
            "state": "regular",
            // "quantity": 2,
            "movements": []
        },
        {
            "category": "Herramienta",
            "name": "Caja con esmeril y taladro",
            "id": "4c0fb5c3-3ef2-48dc-8122-8b3943d96b22",
            "price": 120.0,
            "state": "nuevo",
            // "quantity": 1,
            "movements": []
        },
        {
            "category": "Electrónico",
            "name": "Micrómetro 0-25 mm",
            "id": "917ecf95-8252-44a4-bf12-cd63761d0f1f",
            "price": 80.0,
            "state": "nuevo",
            // "quantity": 3,
            "movements": []
        },
        {
            "category": "Electrónico",
            "name": "Tester o multímetro",
            "id": "86d58b9d-c437-45a6-9b93-61a6e03f17f4",
            "price": 40.0,
            "state": "regular",
            // "quantity": 5,
            "movements": []
        },
        {
            "category": "Electrónico",
            "name": "Scanner automotriz",
            "id": "84ec7e91-9988-45de-8d73-1a3c58f83124",
            "price": 300.0,
            "state": "nuevo",
            // "quantity": 2,
            "movements": []
        },
        {
            "category": "Educación",
            "name": "Pizarra blanca",
            "id": "fb49d2b2-bfa3-4232-a9db-568d1f617634",
            "price": 50.0,
            "state": "regular",
            // "quantity": 6,
            "movements": []
        },
        {
            "category": "Herramienta",
            "name": "Limas variadas",
            "id": "33a5cc21-0f16-4b76-8f3c-b96e788d4a90",
            "price": 8.0,
            "state": "dañado",
            // "quantity": 10,
            "movements": []
        },
        {
            "category": "Herramienta",
            "name": "Destornilladores planos y Phillips",
            "id": "c091b7b1-d136-4d95-8b69-1d7a846c54d4",
            "price": 20.0,
            "state": "nuevo",
            // "quantity": 12,
            "movements": []
        },
        {
            "category": "Electrónico",
            "name": "Juego de brocas",
            "id": "d6f0899a-57df-4ea7-95d4-56c813f2207f",
            "price": 35.0,
            "state": "regular",
            // "quantity": 4,
            "movements": []
        },
        {
            "category": "Electrónico",
            "name": "Protos board",
            "id": "5e9c98c5-4f59-48cb-a33d-5a2bc70fbb7a",
            "price": 25.0,
            "state": "nuevo",
            // "quantity": 15,
            "movements": []
        },
        {
            "category": "Herramienta",
            "name": "Juego extractor de válvulas",
            "id": "b12345fd-6f87-4b8a-a9fb-9ec0b6f83e29",
            "price": 75.0,
            "state": "nuevo",
            // "quantity": 2,
            "movements": []
        }
    ]
});
