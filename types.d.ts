export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredPost: boolean;
  featureImage?: Photo;
  createAt?: string;
  author?: Author;
  categories?: Category[];
};

export type Author = {
  id: string;
  name: string;
  photo?: Photo;
  bio?: string;
  posts?: Post[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  posts: Post[];
};

export type Comment = {
  id: string;
  name: string;
  email: string;
  comment?: string;
  createdAt?: string;
};

export type Photo = {
  url: string;
};

export type PostConnection = {
  postsConnection: {
    edges: {
      node: Post;
    }[];
  };
};

export type PostDetails = {
  posts: PostDetail[];
};

export type PostDetail = {
  title: string;
  featureImage: Photo;
  createdAt: string;
  slug: string;
  categories: Category[];
  author: Author;
  content: {
    raw: any;
  };
};
