import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: {
    showSidebar: false,
    showDeletePostConfirmationModal: false,
    auth: {
      isAuthenticated: false,
      user: {},
    },
    postsData: {
      posts: [],
      isFetchingPosts: false,
    },
    postManagement: {
      isEditingPost: false,
      globalPost: null,
      showCreateOrEditPost: false,
    },
  },
};

export const ReducerSlice = createSlice({
  name: "fb3",
  initialState,
  reducers: {
    setShowSidebarAction: (state, action) => {
      state.client.showSidebar = action.payload.showSidebar;
    },
    setCurrentUser: (state, action) => {
      state.client.auth.isAuthenticated = action.payload.user ? true : false;
      state.client.auth.user = action.payload.user;
    },

    /**
     * states for posts management
     */
    setPostsData: (state, action) => {
      state.client.postsData.isFetchingPosts = action.payload.isFetchingPosts;
      state.client.postsData.posts = action.payload.posts;
    },

    setIsEditingPost: (state, action) => {
      state.client.postManagement.isEditingPost = action.payload.isEditingPost;
    },

    setShowCreateOrEditPost: (state, action) => {
      state.client.postManagement.showCreateOrEditPost =
        action.payload.showCreateOrEditPost;
    },

    setGlobalPost: (state, action) => {
      state.client.postManagement.globalPost = action.payload.globalPost;
    },

    /**
     * modal management
     */
    setShowDeletePostConfirmationModal: (state, action) => {
      state.client.showDeletePostConfirmationModal =
        action.payload.showDeletePostConfirmationModal;
    },
  },
});

export const {
  setShowSidebarAction,
  setCurrentUser,
  setPostsData,
  setIsEditingPost,
  setShowCreateOrEditPost,
  setGlobalPost,
  setShowDeletePostConfirmationModal,
} = ReducerSlice.actions;

export default ReducerSlice.reducer;
