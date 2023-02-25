import React, { type FC, useState } from "react";
import { Post } from "src/types/typings.t";
import { Dropdown, ManagePost } from "@/components";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useAuth } from "@/hooks";

type PostProps = {
  post: Post;
};

const Post: FC<PostProps> = ({ post }) => {
  /**
   * component states
   */
  const [showManageProfileDropdown, setShowManageProfileDropdown] =
    useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={`w-full rounded-xl border p-2  ${
        isAuthenticated ? " xmd:w-[75%]" : " sm:w-9/12 md:w-[70%]  xmd:w-[60%]"
      }`}
    >
      {/* title */}
      <p className="px-3 py-1 text-sm  font-bold capitalize leading-loose text-primary">
        {post.title}
      </p>

      {/* body */}
      <p className="text-primary/60 first-letter:uppercase">{post?.body}</p>

      {/* action btn */}
      <div className="flex justify-end">
        <Dropdown
          inactive={<HiEllipsisHorizontal className="icon" />}
          active={<HiEllipsisHorizontal className="icon" />}
          dropdownComponent={<ManagePost post={post} />}
          displayState={showManageProfileDropdown}
          setDisplayState={setShowManageProfileDropdown}
        />
      </div>
    </div>
  );
};

export default Post;
