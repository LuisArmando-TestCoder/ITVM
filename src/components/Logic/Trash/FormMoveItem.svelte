<script lang="ts">
    import { createForm } from "svelte-forms-lib";
    import { selectedUser, selectedItem } from "./store";
    import moveItem from "./moveItem";
    import { get } from "svelte/store";

    const initialValues = {
        movementType: "in",
        state: "new",
        price: 0,
        movementIndex: null,
    };

    // Initialize form
    const { form, handleChange, handleSubmit } = createForm({
        initialValues,
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.movementType) errors.movementType = "Movement type is required";
            if (!values.state) errors.state = "State is required";
            if (values.price < 0) errors.price = "Price cannot be negative";
            return errors;
        },
        onSubmit: function (values: { movementType: string; state: string; price: number; movementIndex: null; }) {
            onSubmit(values);
        }
    });

    // Handle form submission
    const onSubmit = (values: any) => {
        const currentUser = get(selectedUser);
        const currentItem = get(selectedItem);

        if (!currentUser || !currentItem) {
            alert("Please select both a user and an item before submitting the form.");
            return;
        }

        const result = moveItem({
            itemId: currentItem.id,
            movementType: values.movementType,
            state: values.state,
            movementPrice: values.price,
            userId: currentUser.id,
        });

        if (result instanceof Error) {
            alert(`Error: ${result.message}`);
        } else {
            alert("Movement successfully added/updated!");
            form.set(initialValues); // Reset the form
        }
    };
</script>


<section class="form-container">
    <h2 class="container__subtitle">Movement Form</h2>

    <form on:submit={handleSubmit}>
        <!-- Movement Type -->
        <div class="form-group">
            <label for="movementType">Movement Type</label>
            <select
                id="movementType"
                name="movementType"
                on:change={handleChange}
                bind:value={$form.movementType}>
                <option value="in">In</option>
                <option value="out">Out</option>
            </select>
        </div>

        <!-- State -->
        <div class="form-group">
            <label for="state">State</label>
            <select
                id="state"
                name="state"
                on:change={handleChange}
                bind:value={$form.state}>
                <option value="new">New</option>
                <option value="fixed">Fixed</option>
                <option value="broken">Broken</option>
                <option value="consumed">Consumed</option>
            </select>
        </div>

        <!-- Price -->
        <div class="form-group">
            <label for="price">Price</label>
            <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                on:change={handleChange}
                bind:value={$form.price} />
        </div>

        <button type="submit" class="form-button">Submit Movement</button>
    </form>
</section>

<style lang="scss">
    @import "./styles.scss";

    .form-container {
        padding: 16px;
        border: 1px solid var(--color-outline);
        border-radius: 8px;
        background: rgba(var(--color-background), 0.6);
        margin-bottom: 16px;

        h2 {
            margin-bottom: 16px;
            color: var(--color-background);
        }

        .form-group {
            margin-bottom: 16px;

            label {
                display: block;
                margin-bottom: 8px;
                color: var(--color-background);
            }

            input,
            select {
                width: 100%;
                padding: 8px;
                border: 1px solid var(--color-outline);
                border-radius: 4px;
                background: rgba(var(--color-background), 0.8);
                color: var(--color-background);
            }
        }

        .form-button {
            padding: 8px 16px;
            background: var(--color-outline);
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            color: var(--color-foreground);

            &:hover {
                background: rgba(var(--color-outline), 0.8);
                color: var(--color-background);
            }
        }
    }
</style>
