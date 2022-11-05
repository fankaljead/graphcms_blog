import Head from "next/head";

import { getPosts } from "../services";
import { PostCard, Categories, PostWidget } from "../components";
import { FeaturedPosts } from "../sections/index";
import { Post } from "../types";

// const posts = [
//   {
//     title: "React Test",
//     excerpt: "Learn React Testing",
//   },
//   {
//     title: "React Test TailwindCSS",
//     excerpt: "Learn React TailWindCSS Testing",
//   },
// ];

type IProps = {
  posts: {
    node: Post;
  }[];
};

const Home = ({ posts }: IProps) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FeaturedPosts />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.node.title} />
          ))}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget categories={[]} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = (await getPosts()) || [];

  return {
    props: {
      posts,
    },
  };
};

export default Home;
