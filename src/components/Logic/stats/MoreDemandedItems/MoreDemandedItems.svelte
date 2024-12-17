<script lang="ts">
    import { onMount } from "svelte";
    import { Chart, registerables } from "chart.js";
    import { getMoreDemandedItems, type ItemDemandStats } from "./MoreDemandedItems";
    import { inventory } from "../../Data";

    // Register all Chart.js components
    Chart.register(...registerables);

    let chart: Chart;
    let canvas: HTMLCanvasElement;

    $: {
        (() => {
            if (!$inventory || !canvas) return;

            const data = getMoreDemandedItems($inventory);
            const ctx = canvas.getContext("2d");
            const chartData = formatChartData(data);

            if (chart) chart.destroy();

            chart = new Chart(ctx as CanvasRenderingContext2D, {
                type: "bar",
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Allow canvas to fill the parent container
                    plugins: {
                        legend: {
                            display: true,
                        },
                    },
                    scales: {
                        x: {
                            type: "category",
                            title: {
                                display: true,
                                text: "Items",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Total 'Out' Movements",
                            },
                            beginAtZero: true,
                        },
                    },
                },
            });
        })();
    }

    function formatChartData(data: ItemDemandStats[]) {
        if (!data || data.length === 0) return { labels: [], datasets: [] };

        const labels = data.map(item => item.itemName || item.itemId || "Unknown");
        const inCounts = data.map(item => item.totalInMovements || 0);

        return {
            labels,
            datasets: [
                {
                    label: "Demand (In Movements)",
                    data: inCounts,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 1,
                },
            ],
        };
    }

    onMount(() => {
        return () => {
            if (chart) chart.destroy();
        };
    });
</script>

<div class="chart-container">
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    .chart-container {
        width: 100%;
        height: 400px;
        position: relative;
    }

    canvas {
        display: block;
    }
</style>
