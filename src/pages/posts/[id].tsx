import { Comment, SpinnerLoader, Title } from "@/components";
import { useAuth, usePost } from "@/hooks";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SinglePostInfo = () => {
  /**
   * page states
   */
  const { isFetchingPostComments, comments, post, isFetchingPost } = usePost();
  const { isAuthenticated } = useAuth();
  /**
   * component functions
   */

  return (
    <section className="h-[46rem] p-4 xs:h-[40rem] sm:h-[40rem]">
      {isFetchingPost ? (
        <div className="flex h-[15rem] items-center justify-center">
          <SpinnerLoader color="fill-orange " />
        </div>
      ) : (
        <div className="flex h-[15rem] w-full justify-center overflow-y-scroll bg-orange/5 scrollbar-hide">
          <div
            className={`   rounded-xl  p-2  ${
              isAuthenticated
                ? " xmd:w-[75%]"
                : " sm:w-9/12 md:w-[70%]  xmd:w-[60%]"
            }`}
          >
            {post?.title ? (
              <div className=" divide-y divide-orange  rounded-md px-3 py-1 text-base capitalize  shadow-sm">
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
        </div>
      )}

      {/* comments */}
      <div className="mt-5 flex h-[28rem] flex-col gap-2  p-2 xs:h-[22rem] ">
        {/* title */}
        <Title title="Comments." />

        {isFetchingPostComments ? (
          <div className="flex h-full items-center justify-center">
            <SpinnerLoader color="fill-orange " />
          </div>
        ) : (
          <div className="flex h-[27rem] w-full flex-col items-center  overflow-y-scroll border scrollbar-hide">
            {comments?.length > 0 ? (
              comments?.map((comment: any, commentIndex: number) => (
                <Comment key={commentIndex} comment={comment} />
              ))
            ) : (
              <div>No comments Found.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SinglePostInfo;
