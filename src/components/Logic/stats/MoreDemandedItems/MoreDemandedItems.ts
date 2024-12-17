import type { Inventory, Item } from "../../types";

export type ItemDemandStats = {
    id: string;
    name: string;
    totalInMovements: number;
};

export function getMoreDemandedItems(inventory: Inventory): ItemDemandStats[] {
    const stats: ItemDemandStats[] = inventory.items.map(({ name, id, movements }: Item) => {
        const inMovementsCount = movements.filter(mov => mov.type === "out").length;
        return {
            id,
            name,
            totalInMovements: inMovementsCount,
        };
    });

    stats.sort((a, b) => b.totalInMovements - a.totalInMovements);

    return stats;
}
