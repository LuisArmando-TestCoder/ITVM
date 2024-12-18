import type { Inventory, State, User } from "../../types";

export type UserStateStats = {
    id: string;
    name: string;
    totalInMovements?: number;
    totalStateEntries?: number;
    total: number;
};

export function whoBringsMoreStateProportionallyFromOtherStates(state: State, inventory: Inventory, users: User[]): UserStateStats[] {
    const userStateStats: UserStateStats[] = users.map(({ id, name }) => ({
        id,
        name,
        totalInMovements: 0,
        totalStateEntries: 0,
        total: 0,
    }));

    inventory.items.forEach((item) => {
        item.movements.forEach((movement, index) => {

            if (movement.type === "out" || !index) return;

            const UserStateStats = userStateStats.find(({ id }) => id === movement.userId) as unknown as UserStateStats;

            (UserStateStats.totalInMovements as number)++;

            const previousMovement = item.movements[index - 1];

            if (movement.state === state && movement.state !== previousMovement.state) {
                (UserStateStats.totalStateEntries as number)++;
                console.log("here", "here")
            }

            UserStateStats.total = (UserStateStats.totalStateEntries as number) / (UserStateStats.totalInMovements as number);
        });
    });

    // console.log(userStateStats);

    return userStateStats;
}