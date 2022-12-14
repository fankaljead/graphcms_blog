import React from "react";

import { getPosts, getPostDetails } from "../../services";

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "../../components";
import { PostDetail as PostDetailT } from "../../types";

interface IProps {
  post: PostDetailT;
}

const PostDetails = ({ post }: IProps) => {
  // console.log(`post:`, post);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await getPostDetails(slug);

  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.node.slug } })),
    fallback: false,
  };
}

export default PostDetails;
