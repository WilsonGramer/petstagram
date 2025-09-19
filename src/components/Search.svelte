<script>
    import { searchFilters } from "../search";

    let { filters = $bindable(), inputs = $bindable() } = $props();

    const addFilter = () => {
        filters.push(searchFilters[0]);
        inputs.push(undefined);
    };

    const removeFilter = (index) => {
        filters.splice(index, 1);
        inputs.splice(index, 1);
    };
</script>

{#if filters.length > 0}
    <div class="container search">
        {#each filters as filter, index}
            <div class="filter">
                <select
                    onchange={(e) => {
                        filters[index] =
                            searchFilters[e.currentTarget.selectedIndex];
                    }}
                >
                    {#each searchFilters as option}
                        <option value={option.name}>{option.name}</option>
                    {/each}
                </select>

                <input
                    type={filter.type}
                    oninput={(e) => {
                        inputs[index] =
                            filter.type === "number"
                                ? parseInt(e.currentTarget.value, 10)
                                : e.currentTarget.value;
                    }}
                />

                <button
                    title="Remove"
                    class="remove"
                    onclick={() => removeFilter(index)}
                >
                    <span class="icon">remove</span>
                </button>
            </div>
        {/each}

        <button class="add" onclick={addFilter}>
            <span class="icon">add</span>
            Add filter
        </button>
    </div>
{:else}
    <button class="container empty" onclick={addFilter}>
        <span class="icon">search</span>
        Search posts
    </button>
{/if}

<style>
    .container {
        margin-block: 10px;
        border: 1.5px solid color(from black srgb r g b / 5%);
        border-radius: 20px;
        padding: 10px;
    }

    .search {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .filter {
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    .filter select {
        border-radius: 999px;
        background: color(from black srgb r g b / 2.5%);
        padding: 4px;
    }

    .filter input {
        flex: 1;
        border: 1.5px solid color(from black srgb r g b / 5%);
        border-radius: 10px;
        padding: 0 6px;
    }

    .add,
    .remove {
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-start;
        gap: 4px;
        cursor: pointer;
        border-radius: 999px;
    }

    .add {
        background: color(from dodgerblue srgb r g b / 90%);
        padding: 4px 12px;
        color: white;

        &:hover {
            background: color-mix(in srgb, dodgerblue 87.5%, black 12.5%);
        }
    }

    .remove {
        align-self: center;
        background: color(from red srgb r g b / 75%);
        width: 24px;
        height: 24px;
        color: white;

        &:hover {
            background: color-mix(in srgb, red 87.5%, black 12.5%);
        }
    }

    .empty {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 4px;
        cursor: pointer;

        &:hover {
            background: color(from black srgb r g b / 2.5%);
        }
    }
</style>
