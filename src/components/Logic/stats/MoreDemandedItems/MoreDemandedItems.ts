import type { Inventory, Item } from "../../types";

export type ItemDemandStats = {
    itemId: string;
    itemName: string;
    totalInMovements: number;
};

export function getMoreDemandedItems(inventory: Inventory): ItemDemandStats[] {
    const stats: ItemDemandStats[] = inventory.items.map((item: Item) => {
        const inMovementsCount = item.movements.filter(mov => mov.type === "out").length;
        return {
            itemId: item.id,
            itemName: item.name,
            totalInMovements: inMovementsCount,
        };
    });

    stats.sort((a, b) => b.totalInMovements - a.totalInMovements);

    return stats;
}
