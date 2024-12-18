<script lang="ts">
    import { onMount } from "svelte";
    import { Chart, registerables } from "chart.js";
    import type { Writable } from "svelte/store";

    export let dataCallback: Function;
    export let HEXColor: string;
    export let xText: string;
    export let yText: string;

    // Register all Chart.js components
    Chart.register(...registerables);

    let chart: Chart;
    let canvas: HTMLCanvasElement;

    $: {
        (() => {
            if (!canvas) return;

            const processed = dataCallback();
            const ctx = canvas.getContext("2d");
            const chartData = formatChartData(processed);

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
                                text: xText,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: yText,
                            },
                            beginAtZero: true,
                        },
                    },
                },
            });
        })();
    }

    function formatChartData(data: any[]) {
        if (!data || data.length === 0) return { labels: [], datasets: [] };

        const labels = data.map(item => item.name || item.id || "Unknown");
        const inCounts = data.map(item => item.total || 0);

        return {
            labels,
            datasets: [
                {
                    label: yText,
                    data: inCounts,
                    borderColor: HEXColor,
                    backgroundColor: `${HEXColor}44`,
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
