<script lang="ts">
    import { onMount } from "svelte";
    import { Chart, registerables } from "chart.js";
    import { whoBringsMoreStateProportionallyFromOtherStates } from "./stats";
    import { inventory, users } from "./Data";
    import type { UserStateStats } from "./stats";

    // Register all Chart.js components
    Chart.register(...registerables);

    let chart: Chart;
    let canvas: HTMLCanvasElement;

    $: {
        (() => {
            if (!$inventory || !$users || !canvas) return;

            const data = whoBringsMoreStateProportionallyFromOtherStates(
                "broken",
                $inventory,
                $users,
            );
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
                                text: "Users",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Proportion",
                            },
                            beginAtZero: true,
                        },
                    },
                },
            });
        })();
    }

    // Format data for Chart.js
    function formatChartData(data: UserStateStats[]) {
        if (!data || data.length === 0) return { labels: [], datasets: [] };

        const labels = data.map(
            (item) => item.userName || item.userId || "Unknown",
        );
        const proportions = data.map((item) => item.entryProportion || 0);

        return {
            labels,
            datasets: [
                {
                    label: "Entry Proportion",
                    data: proportions,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 1,
                },
            ],
        };
    }

    onMount(() => {
        return () => {
        };
    });
</script>

<div class="chart-container">
    <canvas bind:this={canvas}></canvas>
</div>

<!-- Define styles for canvas and its container -->
<style>
    .chart-container {
        width: 100%; /* Full width of parent */
        height: 400px; /* Fixed height for the graph */
        position: relative;
    }

    canvas {
        display: block;
    }
</style>
