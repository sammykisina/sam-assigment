import React from "react";
import { Button, ModalHeader, SpinnerLoader } from "@/components";
import {
  setShowDeletePostConfirmationModal,
  setGlobalPost,
} from "src/redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { usePost } from "@/hooks";

const DeletePostConfirmation = () => {
  /**
   * component states
   */
  const dispatch = useDispatch();
  const { isDeletingPost, deletePostMutateAsync } = usePost();
  const globalPost = useSelector(
    (state: any) => state.app.client.postManagement.globalPost
  );

  return (
    <section>
      {/* header */}
      <ModalHeader
        close={() => {
          dispatch(setGlobalPost({ globalPost: null }));
          dispatch(
            setShowDeletePostConfirmationModal({ showCreateOrEditPost: false })
          );
        }}
        title="Deleting A Post."
      />

      <div className="mt-3 flex flex-col items-center justify-center">
        <span className="font-semibold">
          Are you sure you want to delete this post?
        </span>
        <span className="font-bold text-red-500">
          Beware! This action is irreversible
        </span>
      </div>

      <div className="mt-3 flex flex-row justify-end gap-3 px-4">
        <Button
          title="Cancel"
          intent="primary"
          type="button"
          purpose={() => {
            dispatch(setGlobalPost({ globalPost: null }));
            dispatch(
              setShowDeletePostConfirmationModal({
                showCreateOrEditPost: false,
              })
            );
          }}
        />
        <Button
          title={
            isDeletingPost ? (
              <SpinnerLoader color="fill-white" />
            ) : (
              "Delete Post"
            )
          }
          intent="danger"
          type="button"
          purpose={() => deletePostMutateAsync(globalPost?.id)}
        />
      </div>
    </section>
  );
};

export default DeletePostConfirmation;
