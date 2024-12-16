<script lang="ts">
    import { selectedItem } from "./store";
    import { get } from "svelte/store";
    import type { Item, Movement } from "./types";
</script>

<div class="movements-grid">
    <h2 class="movements-grid__title">Movements</h2>
    {#if $selectedItem?.movements?.length > 0}
        <div class="grid">
            {#each $selectedItem.movements as movement, index}
                <div class="grid-item">
                    <ul>
                        <li><strong>User ID:</strong> {movement.userId}</li>
                        <li><strong>Type:</strong> {movement.type}</li>
                        <li><strong>State:</strong> {movement.state}</li>
                        <li><strong>Time:</strong> {movement.time}</li>
                        <li><strong>Price:</strong> ${movement.price}</li>
                    </ul>
                </div>
            {/each}
        </div>
    {:else}
        <p>No movements available for this item.</p>
    {/if}
</div>

<style lang="scss">
    @import "./styles.scss";

    .movements-grid {
        margin-top: 24rem;
        padding: 16rem;
        border: 1rem solid var(--color-outline);
        border-radius: 8rem;
        background: rgba(var(--color-background), 0.6);

        &__title {
            font-size: 18rem;
            margin-bottom: 16rem;
            color: var(--color-background);
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200rem, 1fr));
            gap: 16rem;
        }

        .grid-item {
            padding: 12rem;
            border: 1rem solid var(--color-outline);
            border-radius: 8rem;
            background: rgba(var(--color-background), 0.8);

            h3 {
                font-size: 16rem;
                margin-bottom: 8rem;
                color: var(--color-background);
            }

            ul {
                list-style: none;
                padding: 0;

                li {
                    font-size: 14rem;
                    margin-bottom: 8rem;
                    color: var(--color-background);

                    strong {
                        color: var(--color-background);
                    }
                }
            }
        }

        p {
            font-size: 16rem;
            color: var(--color-background);
        }
    }
</style>
