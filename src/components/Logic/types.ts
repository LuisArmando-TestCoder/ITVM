import type { categories, states, userTypeNames } from "./Data";

export type State = typeof states[number];

export type Category = typeof categories[number];

export type UserTypeName = typeof userTypeNames[number];

export type MovementType = "out" | "in";

export type Movement = {
    userId: string;
    type: MovementType;
    state: State;
    time: string; // Date as ISOString
    price: number;
};

export type Item = {
    category: Category;
    name: string;
    id: string;
    price: number;
    state: State;
    movements: Movement[];
};

export type Inventory = {
    id: string;
    items: Item[]
};

export type ViewerPermissions = ["read"];

export type EditorPermissions = [...ViewerPermissions, "update"];

export type AdminPermissions = [...EditorPermissions, "create"];

export type OwnerPermissions = [...AdminPermissions, "delete"];

export type UserPermissions = ViewerPermissions | EditorPermissions | AdminPermissions | OwnerPermissions;

export type UserType = {
    name: UserTypeName;
    permissions: UserPermissions;
};

export type User = {
    name: string;
    id: string;
    userType: UserType;
    currentItemsIds: string[];
};
