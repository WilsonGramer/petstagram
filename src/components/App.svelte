<script>
    import Post from "./Post.svelte";
    import Search from "./Search.svelte";
    import allPosts from "../posts.json";

    const getRandomPosts = function* (n) {
        const posts = [...allPosts];
        for (let i = 0; i < n; i++) {
            yield* posts.splice(Math.random() * (allPosts.length - i), 1);
        }
    };

    const randomPosts = [...getRandomPosts(3)];

    let filters = $state([]);
    let inputs = $state([]);

    const { posts, comments } = $derived.by(() => {
        if (filters.length === 0) {
            return {
                posts: randomPosts,
                comments: [],
            };
        }

        let filteredPosts = new Set();
        const comments = [];

        filters.forEach(({ filter, comment }, index) => {
            const input = inputs[index];

            // Intentionally ignore "", 0, and undefined
            if (!input) {
                return;
            }

            const filtered = filter(allPosts, input);

            // Merge the posts produced by this filter into the final list
            filteredPosts = filteredPosts.union(new Set(filtered));

            comments.push(comment(filtered, input));
        });

        return {
            posts: filteredPosts,
            comments,
        };
    });
</script>

<div class="container">
    <h1>
        <span class="icon">pets</span>
        Petstagram
    </h1>

    <Search bind:filters bind:inputs />

    <h2>
        {#if filters.length > 0}
            Search Results
        {:else}
            Your Feed
        {/if}
    </h2>

    {#each comments as comment}
        <p>{comment}</p>
    {/each}

    <ul class="posts">
        {#each posts as post}
            <Post {post} />
        {:else}
            <div class="empty">No results</div>
        {/each}
    </ul>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: safe center;
        align-items: stretch;
        gap: 10px;
        margin: 0 auto;
        padding: 20px;
        width: 100%;
        max-width: 800px;
    }

    h1 {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 120px;
        font-size: 20pt;
        font-family: "Pacifico", sans-serif;

        @supports (-webkit-background-clip: text) {
            .icon {
                background: linear-gradient(
                    135deg,
                    rgba(131, 58, 180, 1) 0%,
                    rgba(253, 29, 29, 1) 50%,
                    rgba(252, 176, 69, 1) 100%
                );
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }

    h2 {
        font-weight: 500;
        font-size: 14pt;
    }

    .posts {
        width: 100%;

        &:not(.posts:has(.empty)) {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
        }
    }

    .empty {
        flex: 1;
        opacity: 50%;
        margin-top: 20px;
        font-size: 16pt;
        text-align: center;
    }
</style>
