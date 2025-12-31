export const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://localhost/wp-nextjs/blog/index.php?graphql=true";

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    console.error('API Error:', await res.text());
    throw new Error('Failed to fetch API');
  }

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.error('Received non-JSON response:', text.slice(0, 500)); // Log first 500 chars
    throw new Error('Invalid JSON response from API');
  }

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getAllPostsForHome(preview: boolean) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
             categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  );

  return data?.posts;
}

export async function getPostAndMorePosts(slug: string, preview: boolean, previewData: any) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";

  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      id
      databaseId
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
    // Only some of the fields of a revision are considered as there are some inconsistencies
    isRevision
      ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
      : ""
    }
        comments(first: 50, where: { orderby: COMMENT_DATE, order: ASC }) {
          edges {
            node {
              id
              databaseId
              content
              date
              parent {
                node {
                  databaseId
                }
              }
              author {
                node {
                  name
                  avatar {
                    url
                  }
                }
              }
            }
          }
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }: any) => node.slug !== slug);
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop();

  return data;
}

export async function getAllCategories() {
  const data = await fetchAPI(
    `
    query AllCategories {
      categories(first: 20, where: { parent: 0, hideEmpty: true, orderby: COUNT, order: DESC }) {
        edges {
          node {
            name
            slug
            count
            children(first: 10) {
              edges {
                node {
                  name
                  slug
                  count
                }
              }
            }
          }
        }
      }
    }
  `
  );

  return data?.categories;
}

export async function getPostsByCategory(slug: string) {
  const data = await fetchAPI(
    `
    query PostsByCategory($slug: ID!) {
      category(id: $slug, idType: SLUG) {
        name
        slug
        count
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              id
              title
              excerpt
              slug
              date
              featuredImage {
                node {
                  sourceUrl
                }
              }
              author {
                node {
                  name
                  avatar {
                    url
                  }
                }
              }
              categories {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        slug,
      },
    }
  );

  return data?.category;
}

export async function getPostsBySearch(search: string) {
  const data = await fetchAPI(
    `
    query PostsBySearch($search: String!) {
      posts(first: 20, where: { search: $search, orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        search,
      },
    }
  );

  return data?.posts;
}

export async function getPostsByTag(tag: string) {
  const data = await fetchAPI(
    `
    query PostsByTag($tag: String!) {
      posts(first: 5, where: { tag: $tag, orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            tags {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        tag,
      },
    }
  );

  return data?.posts?.edges.map(({ node }: any) => node) || [];
}

export async function getCategoryPosts(slug: string, count: number = 4) {
  const data = await fetchAPI(
    `
      query CategoryPosts($slug: ID!, $count: Int!) {
        category(id: $slug, idType: SLUG) {
          name
          slug
          posts(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
              node {
                id
                title
                excerpt
                slug
                date
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                author {
                  node {
                    name
                    avatar {
                      url
                    }
                  }
                }
                categories {
                  edges {
                    node {
                      name
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        slug,
        count
      },
    }
  );

  return {
    name: data?.category?.name,
    slug: data?.category?.slug,
    posts: data?.category?.posts?.edges?.map(({ node }: any) => node) || []
  };
}

export async function getPopularCategoriesWithPosts(count: number = 3) {
  const data = await fetchAPI(
    `
    query PopularCategories($count: Int!) {
      categories(first: $count, where: { orderby: COUNT, order: DESC, hideEmpty: true }) {
        edges {
          node {
            name
            slug
            posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
              edges {
                node {
                  ...PostFields
                }
              }
            }
          }
        }
      }
    }
    fragment PostFields on Post {
      id
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        edges {
          node {
            name
            slug
          }
        }
      }
      tags {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
    `,
    {
      variables: {
        count,
      },
    }
  );

  return data?.categories?.edges?.map(({ node }: any) => ({
    name: node.name,
    slug: node.slug,
    posts: node.posts?.edges?.map(({ node }: any) => node) || []
  })) || [];
}

export async function getLatestPosts(count: number = 5) {
  const data = await fetchAPI(
    `
    query LatestPosts($count: Int!) {
      posts(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        count,
      },
    }
  );

  return data?.posts?.edges?.map(({ node }: any) => node) || [];
}

export async function createComment(postId: number, content: string, author: string, authorEmail: string) {
  const data = await fetchAPI(
    `
    mutation CreateComment($content: String!, $author: String!, $authorEmail: String!, $commentOn: Int!, $clientMutationId: String!) {
      createComment(input: {
        content: $content,
        author: $author,
        authorEmail: $authorEmail,
        commentOn: $commentOn,
        clientMutationId: $clientMutationId
      }) {
        success
        clientMutationId
        comment {
          id
          databaseId
          content
          date
        }
      }
    }
    `,
    {
      variables: {
        content,
        author,
        authorEmail,
        commentOn: postId,
        clientMutationId: Math.random().toString(36).substring(7)
      },
    }
  );

  return data?.createComment;
}

