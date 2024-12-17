<script lang="ts">
    // Function to copy text to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => console.log('Copied to clipboard!'))
            .catch(err => console.error('Failed to copy text:', err));
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
    on:click|stopPropagation
    on:click={(event) => {
        const text = event.currentTarget.innerText; // Get the text content
        copyToClipboard(text); // Copy it to clipboard
    }}
    class="copy-to-clipboard"
>
    <slot />
</span>

<style lang="scss">
    .copy-to-clipboard {
        display: inline-block;
        cursor: pointer;
        user-select: none; /* Prevent accidental text selection */
        transition: 0.2s;

        &:hover {
            color: #007bff; /* Highlight color on hover */
        }
    }
</style>