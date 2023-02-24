import { Comment, SpinnerLoader, Title } from "@/components";
import { usePost } from "@/hooks";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SinglePostInfo = () => {
  /**
   * page states
   */
  const { isFetchingPostComments, comments, post, isFetchingPost } = usePost();
  console.log("comments", comments);
  console.log("post", post);

  /**
   * component functions
   */

  return (
    <section className="h-[46rem] rounded-[2rem]  border  p-4 sm:h-[40rem]">
      {isFetchingPost ? (
        <div className="flex h-[5rem] items-center justify-center">
          <SpinnerLoader color="fill-orange " />
        </div>
      ) : (
        <div className="h-[15rem]">
          {post?.title ? (
            <div className="bg-primary-200 h-[15rem] divide-y divide-orange  rounded-md px-3 py-1 text-base capitalize  shadow-sm">
              {/* title */}
              <p className="py-4 text-center font-bold first-letter:uppercase">
                {post?.title}
              </p>

              {/* body */}
              <p className="ml-4 pt-3 text-primary/50 first-letter:uppercase">
                {post?.body}
              </p>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              Post not found.
            </div>
          )}
        </div>
      )}

      {/* comments */}
      <div className="mt-5 h-[28rem]   p-2 sm:h-[22rem]">
        {/* title */}
        <Title title="Comments." />

        {isFetchingPostComments ? (
          <div className="flex h-full items-center justify-center">
            <SpinnerLoader color="fill-orange " />
          </div>
        ) : (
          <div className="h-full">
            {comments?.length > 0 ? (
              <div
                className="mt-2 h-[25rem] divide-y divide-primary  overflow-y-scroll border scrollbar-hide
              "
              >
                {comments?.map((comment: any, commentIndex: number) => (
                  <Comment key={commentIndex} comment={comment} />
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <span>No comments found.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SinglePostInfo;
