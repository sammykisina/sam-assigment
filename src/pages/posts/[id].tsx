import { Title } from "@/components";
import React from "react";
import { useSelector } from "react-redux";

const SinglePostInfo = () => {
  /**
   * page states
   */
  const globalPost = useSelector(
    (state: any) => state.app.client.postManagement.globalPost
  );

  console.log("globalPost", globalPost);

  return (
    <section className="h-[40rem]  rounded-[2rem]  border p-4">
      <div className="divide-y divide-orange">
        {/* title */}
        <p className="py-4 text-center font-bold first-letter:uppercase">
          {globalPost?.title}
        </p>

        {/* body */}
        <p className="ml-4 pt-3 text-primary/50 first-letter:uppercase">
          {globalPost?.body}
        </p>
      </div>

      {/* comments */}
      <div className="mt-5 h-[24rem] border p-2">
        {/* title */}
        <Title title="Comments." />
      </div>
    </section>
  );
};

export default SinglePostInfo;
