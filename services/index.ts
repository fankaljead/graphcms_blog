import { request, gql } from "graphql-request";

import {
  Category,
  Comment,
  PostConnection,
  PostDetail,
  PostDetails,
} from "../types";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featureImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const results: PostConnection = await request(graphqlAPI as string, query);

  return results.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
        ) {
          title
          featureImage {
            url
          }
          createdAt
          slug
        }
    }
  `;

  const results: PostDetails = await request(graphqlAPI as string, query);

  return results.posts;
};

export const getSimilarPosts = async (slug: string, categories: string[]) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featureImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const results: PostDetails = await request(graphqlAPI as string, query, {
    slug,
    categories,
  });

  return results.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const results: { categories: Category[] } = await request(
    graphqlAPI as string,
    query
  );

  return results.categories;
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featureImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const results: { post: PostDetail } = await request(
    graphqlAPI as string,
    query,
    { slug }
  );

  return results.post;
};

export const submitComment = async (obj: any) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const results: { comments: Comment[] } = await request(
    graphqlAPI as string,
    query,
    { slug }
  );

  return results.comments;
};

export const getAdjacentPosts = async (createdAt: string, slug: string) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featureImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featureImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI as string, query, {
    slug,
    createdAt,
  });

  return { next: result.next[0], previous: result.previous[0] };
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featureImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `;

  const result = await request(graphqlAPI as string, query);

  return result.posts;
};

export const getCategoryPost = async (slug: string) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featureImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};
