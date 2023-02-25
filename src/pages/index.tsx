import { Post, PostCreate } from "@/components";
import { usePost } from "@/hooks";
import { type NextPage } from "next";
import Head from "next/head";
import type { Post as PostType } from "src/types/typings.t";

const Home: NextPage = () => {
  /**
   * page states
   */
  const { isFetchingAllPosts, allPosts } = usePost();

  /**
   * page functions
   */

  return (
    <>
      <Head>
        <title>fb3</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-full flex-col rounded-[2rem]">
        {/* the post creation initializer */}
        <PostCreate />

        {/* posts */}
        <div className="h-[40rem] w-full  overflow-y-scroll border-t-0">
          {isFetchingAllPosts ? (
            "loading"
          ) : allPosts?.length > 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-3 px-2 md:px-16">
              {allPosts?.map((post: PostType, postIndex: number) => (
                <Post key={postIndex} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <span>No Posts Yet.</span>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
