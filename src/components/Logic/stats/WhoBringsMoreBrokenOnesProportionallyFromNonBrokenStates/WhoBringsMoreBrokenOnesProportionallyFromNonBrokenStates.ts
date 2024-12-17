import type { Inventory, State, User } from "../../types";

export type UserStateStats = {
    userId: string;
    userName: string;
    totalInMovements: number;
    totalStateEntries: number;
    entryProportion: number;
};

export function whoBringsMoreStateProportionallyFromOtherStates(state: State, inventory: Inventory, users: User[]): UserStateStats[] {
    const userStateStats: UserStateStats[] = users.map(({ id, name }) => ({
        userId: id,
        userName: name,
        totalInMovements: 0,
        totalStateEntries: 0,
        entryProportion: 0,
    }));

    inventory.items.forEach((item) => {
        if (item.movements.length > 2) {
            item.movements.forEach((movement, index) => {

                if (movement.type === "out" || !index) return;

                // console.log(movement.type === "in", "here")

                const UserStateStats = userStateStats.find(({ userId }) => userId === movement.userId) as unknown as UserStateStats;

                UserStateStats.totalInMovements++;

                const previousMovement = item.movements[index - 1];

                if (movement.state === state && movement.state !== previousMovement.state) {
                    UserStateStats.totalStateEntries++;
                }

                UserStateStats.entryProportion = UserStateStats.totalStateEntries / UserStateStats.totalInMovements;
            });
        }
    });

    // console.log(userStateStats);

    return userStateStats;
}