/**
 * Filters posts by tag. Posts are included if their list of tags contains the
 * provided tag, ignoring the '#'.
 */
const tagFilter = {
    name: "Tag",
    type: "text",
    filter: (posts, tag) => {
        // Remove the '#' at the beginning of the tag if provided
        if (tag.startsWith("#")) {
            tag = tag.slice(1);
        }

        // Keep track of the posts containing the tag
        const postsWithTag = [];
        for (const post of posts) {
            if (post.tag == tag) {
                // Add the current post to the return value
                postsWithTag.push(post);
            }
        }

        return postsWithTag;
    },
    comment: (filteredPosts, tag) => {
        return `There are ${filteredPosts.length} posts with the tag #${tag}.`;
    },
};

export const searchFilters = [
    tagFilter,
    // ...add more search filters here
];
