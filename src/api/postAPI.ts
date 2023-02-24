import type { Post } from "src/types/typings.t";
import { API } from "./api";

const PostAPI = {
  getPosts: async () => API.get("/posts"),

  createPost: async (newPostData: {
    body: string;
    title: string;
    userId: number;
  }) =>
    API.post(
      "/posts",
      JSON.stringify({
        newPostData,
      })
    ),

  updatePost: async (updatedPostData: Post) =>
    API.patch(
      `posts/${updatedPostData.id}`,
      JSON.stringify({
        updatedPostData,
      })
    ),

  deletePost: async (postId: number) => API.delete(`/posts/${postId}`),
};

export default PostAPI;
