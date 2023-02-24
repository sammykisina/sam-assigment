import React, { FC } from "react";
import { Button, DeletePostConfirmation, Modal, NavLink } from "@/components";
import {
  setShowCreateOrEditPost,
  setIsEditingPost,
  setGlobalPost,
  setShowDeletePostConfirmationModal,
} from "src/redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import type { Post } from "src/types/typings.t";
import { useAuth } from "@/hooks";

type ManagePostProps = {
  post: Post;
};

const ManagePost: FC<ManagePostProps> = ({ post }) => {
  /**
   * component states
   */
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-3 px-4">
      {user?.userId === post?.userId && (
        <div className="flex gap-1">
          <Button
            title="Edit Post"
            intent="primary"
            type="button"
            purpose={() => {
              dispatch(setGlobalPost({ globalPost: { ...post } }));
              dispatch(setIsEditingPost({ isEditingPost: true }));
              dispatch(setShowCreateOrEditPost({ showCreateOrEditPost: true }));
            }}
          />
          <Button
            title="Delete Post"
            intent="danger"
            type="button"
            purpose={() => {
              dispatch(setGlobalPost({ globalPost: { ...post } }));
              dispatch(
                setShowDeletePostConfirmationModal({
                  showDeletePostConfirmationModal: true,
                })
              );
            }}
          />
        </div>
      )}

      <NavLink
        route={{ to: `/posts/${post?.id}`, name: "View Post" }}
        fullWidth={false}
        active
        type="small"
        moreActions={() => {
          dispatch(setGlobalPost({ globalPost: { ...post } }));
        }}
      />
    </div>
  );
};

export default ManagePost;
