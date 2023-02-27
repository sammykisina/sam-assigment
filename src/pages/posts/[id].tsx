import { Comment, Post, SpinnerLoader, Title } from "@/components";
import { usePost } from "@/hooks";

const SinglePostInfo = () => {
  /**
   * page states
   */
  const { isFetchingPostComments, comments, post, isFetchingPost } = usePost();
  /**
   * component functions
   */

  return (
    <section className="h-[47.5rem] overflow-y-scroll  scrollbar-hide   xs:h-[40rem] sm:h-[40rem]">
      {isFetchingPost ? (
        <div className="flex h-[15rem] items-center justify-center">
          <SpinnerLoader color="fill-orange " />
        </div>
      ) : (
        <div className="flex w-full justify-center overflow-y-scroll  scrollbar-hide">
          <div className={`rounded-xl  p-2`}>
            {post?.title ? (
              <Post post={post} />
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
          <div className="flex h-[27rem] w-full flex-col items-center gap-3  overflow-y-scroll scrollbar-hide">
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
