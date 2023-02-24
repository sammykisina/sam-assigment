import React, { useEffect } from "react";
import { Button, Error, SpinnerLoader, WidgetHeader } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  setShowCreateOrEditPost,
  setIsEditingPost,
  setGlobalPost,
} from "src/redux/reducer";
import { postManagementSchemas } from "@/schemas";
import { useAuth, usePost } from "@/hooks";

const CreateOrEditPost = () => {
  /**
   * component states
   */
  const {
    createPostMutateAsync,
    isCreatingPost,
    isUpdatingPost,
    updatePostMutateAsync,
  } = usePost();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const globalPost = useSelector(
    (state: any) => state.app.client.postManagement.globalPost
  );
  const isEditingPost = useSelector(
    (state: any) => state.app.client.postManagement.isEditingPost
  );
  const { postSchema } = postManagementSchemas;
  type PostSchema = z.infer<typeof postSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  /**
   * component functions
   */
  const onSubmit: SubmitHandler<PostSchema> = async ({ body, title }) => {
    isEditingPost
      ? updatePostMutateAsync({
          userId: user?.userId,
          body,
          title,
          id: globalPost?.id,
        })
      : createPostMutateAsync({
          userId: user?.userId,
          body,
          title,
        });
  };

  useEffect(() => {
    if (globalPost && isEditingPost) {
      reset({
        title: globalPost?.title,
        body: globalPost?.body,
      });
    }
  }, [isEditingPost, globalPost, reset]);

  return (
    <section>
      {/* header */}
      <WidgetHeader
        close={() => {
          dispatch(setGlobalPost({ globalPost: null }));
          dispatch(setIsEditingPost({ isEditingPost: false }));
          dispatch(setShowCreateOrEditPost({ showCreateOrEditPost: false }));
          // clearForm();
        }}
        title={!isEditingPost ? "Create A Post." : "Update A Post."}
      />

      <form
        className="flex flex-col gap-6 px-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="flex w-full flex-col gap-4 py-3">
          <div className="flex flex-col gap-y-5 rounded-md border border-primary/10 py-4 px-2">
            <div className="relative">
              <input
                type="text"
                className="input peer"
                placeholder="Post Title"
                {...register("title", { required: true })}
              />
              <label className="inputLabel">Post Title</label>

              {errors["title"] && (
                <Error errorMessage={errors["title"].message} />
              )}
            </div>

            <div className="relative">
              <textarea
                {...register("body")}
                className="input peer"
                placeholder="Post Body"
              />
              <label className="inputLabel">Post Body</label>

              {errors["body"] && (
                <Error errorMessage={errors["body"].message} />
              )}
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button
            title={
              isEditingPost ? (
                isUpdatingPost ? (
                  <SpinnerLoader color="fill-" />
                ) : (
                  "Edit"
                )
              ) : isCreatingPost ? (
                <SpinnerLoader color="fill-white" />
              ) : (
                "Create"
              )
            }
            intent="primary"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default CreateOrEditPost;
