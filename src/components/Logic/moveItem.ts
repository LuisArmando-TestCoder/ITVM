// inventory creator

import type {
    State,
    // Category,
    Movement,
    Item,
    Inventory,
    // UserPermissions,
    EditorPermissions,
    AdminPermissions,
    OwnerPermissions,
    // UserType,
    User,
    MovementType,
} from "./types";

import {
    inventory as defaultInventory,
    users as defaultUsers,
    // categories,
    // states,
} from "./Data";
import { get } from "svelte/store";
import { selectedItem } from "./store";

export default function moveItem({
    itemId,
    movementType,
    state,
    movementPrice = 0,
    inventory = get(defaultInventory) as Inventory,
    users = get(defaultUsers) as User[],
    userId,
    movementIndex = null,
}: {
    itemId: string;
    movementType: MovementType;
    state: State;
    movementPrice?: number;
    inventory?: Inventory;
    users?: User[];
    userId: string;
    movementIndex?: number | null;
}) {
    const errors = {
        USER_NOT_FOUND: "User not found",
        ITEM_NOT_FOUND: "Item not found",
        INVALID_USER_PERMISSION: "User does not have sufficient permissions",
        INVALID_MOVEMENT_TYPE: "Invalid movement type",
        INVALID_PRICE: "Invalid price",
        MOVEMENT_INDEX_NEGATIVE: "The movement update index is a negative number",
    };

    const validationResult = validateMoveItem({
        userId,
        itemId,
        movementType,
        movementPrice,
        users,
        inventory,
        errors,
        movementIndex,
    });

    if (validationResult instanceof Error) return validationResult;

    const { user, item } = validationResult;

    user.currentItemsIds = updateCurrentItemsIds(user.currentItemsIds, item.id, movementType);

    const movement = createMovement(userId, movementType, state, movementPrice);

    if (isValidMovementIndex(movementIndex, item.movements.length)) {
        updateMovement(item, movementIndex as number, movement);
    } else {
        addMovement(item, movement);
    }

    selectedItem.set(item);

    return { inventory, movement, users };
}

function updateCurrentItemsIds(currentItemsIds: string[], itemId: string, movementType: MovementType) {
    return movementType === "out"
        ? Array.from(new Set([...currentItemsIds, itemId]))
        : currentItemsIds.filter((id) => id !== itemId);
}

function createMovement(
    userId: string,
    movementType: MovementType,
    state: State,
    price: number
): Movement {
    return {
        userId,
        type: movementType,
        state,
        time: new Date().toISOString(),
        price,
    };
}

function updateMovement(item: Item, movementIndex: number, updatedMovement: Movement) {
    const { time: previousTime } = item.movements[movementIndex];
    item.movements[movementIndex] = { ...updatedMovement, time: previousTime };
}

function addMovement(item: Item, newMovement: Movement) {
    item.movements = [...item.movements, newMovement];
}

function isValidMovementIndex(index: number | null, length: number): boolean {
    return Number.isInteger(index) && index !== null && index >= 0 && index < length;
}

function hasPermission(user: User): boolean {
    const userPermissions = user.userType.permissions as
        | EditorPermissions
        | AdminPermissions
        | OwnerPermissions;

    return userPermissions.includes("update");
}

function validateMoveItem({
    userId,
    itemId,
    movementType,
    movementPrice,
    users,
    inventory,
    errors,
    movementIndex = null,
}: {
    userId: string;
    itemId: string;
    movementType: MovementType;
    movementPrice: number;
    users: User[];
    inventory: Inventory;
    errors: Record<string, string>;
    movementIndex: number | null;
}): { user: User; item: Item } | Error {
    if (typeof movementIndex === "number" && movementIndex < 0) {
        return new Error(errors.MOVEMENT_INDEX_NEGATIVE);
    }

    const item = inventory.items.find(({ id }) => id === itemId);
    if (!item) return new Error(errors.ITEM_NOT_FOUND);

    const user = users.find(({ id }) => id === userId);
    if (!user) return new Error(errors.USER_NOT_FOUND);

    if (!hasPermission(user)) {
        return Error(errors.INVALID_USER_PERMISSION);
    }

    const movementValidationError = validateMovementUpdate({
        movementType,
        user,
        itemId,
        itemName: item.name,
        users,
        inventory,
    });

    if (movementValidationError) {
        return movementValidationError;
    }

    if (!["in", "out"].includes(movementType)) {
        return new Error(errors.INVALID_MOVEMENT_TYPE);
    }

    if (movementPrice < 0 || isNaN(movementPrice)) {
        return new Error(errors.INVALID_PRICE);
    }

    return { user, item };
}

function validateMovementUpdate({
    movementType,
    user,
    itemId,
    itemName,
    users,
    inventory,
}: {
    movementType: MovementType;
    user: User;
    itemId: string;
    itemName: string;
    users: User[];
    inventory: Inventory;
}): Error | null {
    const getCurrentPossesor = () => users.find(({ currentItemsIds }) =>
        currentItemsIds.includes(itemId)
    );

    if (movementType === "out" && user.currentItemsIds.includes(itemId)) {
        const alternateOptions = getAlternateItemOptions(itemName, inventory);

        return new Error(
            `User ${user.name} with the id ${user.id}, already has an item with the id ${itemId}.
            \nYour other options are: ${alternateOptions}`
        );
    } else if (movementType === "in" && !user.currentItemsIds.includes(itemId) && user.currentItemsIds.length) {
        const currentPossessor = getCurrentPossesor();

        if (currentPossessor) {
            const possessorDetails = `${currentPossessor.name} with the id ${currentPossessor.id}`;
    
            return new Error(
                `User ${user.name} with the id ${user.id}, doesn't have an item with the id ${itemId}.
                \nThis item is in possession of: ${possessorDetails}`
            );
        }

    } else if (movementType === "in") {
        const currentPossessor = getCurrentPossesor();

        if (currentPossessor && currentPossessor.id !== user.id) {
            return new Error(
                `User ${user.name} with the id ${user.id}, should not be returning the item with the id ${itemId}.
                \nThis item is supposed to be in possession of: ${currentPossessor.name} with the id ${currentPossessor.id}`
            );
        }
    }

    const item = inventory.items.find(({ id }) => id === itemId);
    const lastMovement = item?.movements[item?.movements.length - 1];

    if (lastMovement?.type === movementType) {
        return new Error(
            `Last movement was already ${movementType}`
        );
    }

    return null; // No errors
}

function getAlternateItemOptions(itemName: string, inventory: Inventory): string {
    return inventory.items
        .filter(({ name }) => name === itemName)
        .map(({ id }) => id)
        .join(" or ");
}

// I complicate myself now to make my future-self's life easier