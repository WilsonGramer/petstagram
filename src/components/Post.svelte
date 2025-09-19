<script>
    import { format } from "date-fns";

    const { post } = $props();
</script>

<li class="post">
    <img src={post.image} alt="" />

    <div class="info">
        <p class="user">@{post.user}</p>

        <p class="likes">
            <span class="icon">favorite</span>
            {post.likes}
        </p>
    </div>

    <ul class="tags">
        {#each post.tags as tag}
            <li>#{tag}</li>
        {/each}
    </ul>

    <p class="date">
        {format(post.date, "MMM d 'at' h:mm a")}
    </p>
</li>

<style>
    .post {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border: 1.5px solid color(from black srgb r g b / 5%);
        border-radius: 8px;
        padding-bottom: 8px;
        width: calc(var(--container-width) / 3);
        overflow: clip;
    }

    img {
        background-color: gray;
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0px 8px;
        font-size: 11pt;

        .user {
            opacity: 50%;
        }

        .likes {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 4px;
            font-weight: 500;
        }

        .icon {
            color: deeppink;
        }
    }

    .tags {
        display: block;
        flex: 1;
        padding: 0px 8px;

        li {
            display: inline-block;
            margin-right: 4px;
        }
    }

    .date {
        opacity: 30%;
        padding: 0px 8px;
        font-size: 10pt;
    }
</style>
