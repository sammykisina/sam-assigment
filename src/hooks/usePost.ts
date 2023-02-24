import { PostAPI } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import type { Post } from "src/types/typings.t";
import { Notifications } from "@/components";
import {
  setShowCreateOrEditPost,
  setShowDeletePostConfirmationModal,
  setGlobalPost,
  setPostsData,
  setIsEditingPost,
} from "src/redux/reducer";
import { useRouter } from "next/router";

const usePost = () => {
  /**
   * hook states
   */
  const dispatch = useDispatch();
  const router = useRouter();
  const postId = router?.query.id;
  const allPosts = useSelector(
    (state: any) => state.app.client.postsData.posts
  );
  const isFetchingAllPosts = useSelector(
    (state: any) => state.app.client.postsData.isFetchingPosts
  );
  const globalPost = useSelector(
    (state: any) => state.app.client.postManagement.globalPost
  );

  /**
   * hook functions
   */
  useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return await PostAPI.getPosts();
    },
    onSuccess: (data) => {
      dispatch(
        setPostsData({
          isFetchingPosts: false,
          posts: data,
        })
      );
    },
  });

  const { mutateAsync: createPostMutateAsync, isLoading: isCreatingPost } =
    useMutation({
      mutationFn: (newPostData: Post) => {
        return PostAPI.createPost(newPostData);
      },

      onSuccess: async (data) => {
        console.log("data after ce", data);

        /**
         * in a full api i wld invalidate the query as below
         */
        // queryClient.invalidateQueries({ queryKey: ["posts"] });

        //  am adding the new post to the existing posts
        dispatch(
          setPostsData({
            isFetchingPosts: false,
            posts: [{ ...data.newPostData, id: data.id }, ...allPosts],
          })
        );

        dispatch(
          setShowCreateOrEditPost({
            showCreateOrEditPost: false,
          })
        );
        Notifications.successNotification("Post Created Successfully.");
      },
    });

  const { mutateAsync: updatePostMutateAsync, isLoading: isUpdatingPost } =
    useMutation({
      mutationFn: (updatedPostData: Post) => {
        return PostAPI.updatePost(updatedPostData);
      },

      onSuccess: async (data) => {
        const postBeingUpdated = allPosts.find(
          (post: Post) => post.id === data.updatedPostData.id
        );
        const postsWithoutTheUpdatedPost = allPosts.filter(
          (post: Post) => post.id !== postBeingUpdated?.id
        );
        dispatch(
          setPostsData({
            isFetchingPosts: false,
            posts: [
              { ...data.updatedPostData, id: data.id },
              ...postsWithoutTheUpdatedPost,
            ],
          })
        );

        dispatch(
          setShowCreateOrEditPost({
            showCreateOrEditPost: false,
          })
        );

        dispatch(
          setIsEditingPost({
            isEditingPost: false,
          })
        );

        dispatch(
          setGlobalPost({
            globalPost: null,
          })
        );

        Notifications.successNotification("Post Updated Successfully.");
      },
    });

  const { mutateAsync: deletePostMutateAsync, isLoading: isDeletingPost } =
    useMutation({
      mutationFn: (postId: number) => {
        return PostAPI.deletePost(postId);
      },

      onSuccess: async (data) => {
        const postBeingDeleted = allPosts.find(
          (post: Post) => post.id === globalPost?.id
        );
        const postsWithoutTheDeletedPost = allPosts.filter(
          (post: Post) => post.id !== postBeingDeleted?.id
        );
        dispatch(
          setPostsData({
            isFetchingPosts: false,
            posts: postsWithoutTheDeletedPost,
          })
        );

        dispatch(
          setGlobalPost({
            globalPost: null,
          })
        );

        dispatch(
          setShowDeletePostConfirmationModal({
            showDeletePostConfirmationModal: false,
          })
        );

        Notifications.successNotification("Post Deleted Successfully.");
      },
    });

  const { data: comments, isLoading: isFetchingPostComments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async ({ queryKey }) => {
      const [_, postId] = queryKey;
      if (postId) {
        return await PostAPI.getSinglePostComments(postId);
      }

      return [];
    },
  });

  const { data: post, isLoading: isFetchingPost } = useQuery({
    queryKey: ["post", postId],
    queryFn: async ({ queryKey }) => {
      const [_, postId] = queryKey;
      if (postId) {
        return await PostAPI.getSinglePostInfo(postId);
      }

      return [];
    },
  });

  return {
    allPosts,
    isFetchingAllPosts,
    createPostMutateAsync,
    isCreatingPost,
    updatePostMutateAsync,
    isUpdatingPost,
    deletePostMutateAsync,
    isDeletingPost,
    comments,
    isFetchingPostComments,
    post,
    isFetchingPost,
  };
};

export default usePost;
