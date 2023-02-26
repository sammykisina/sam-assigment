import React, { type FC, useState } from "react";
import { Post } from "src/types/typings.t";
import { Dropdown, Icon, ManagePost } from "@/components";
import {
  HiEllipsisHorizontal,
  HiOutlineBookmark,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
} from "react-icons/hi2";
import { useAuth } from "@/hooks";
import { appConstants } from "@/constants";
import { appUtils } from "@/utils";

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
  const { colors } = appConstants;
  const { getRandomImageColorIndex, generateAvatar } = appUtils;

  return (
    <div
      className={`w-full rounded-[2.5rem] bg-white p-2 shadow  ${
        isAuthenticated ? " xmd:w-[75%]" : " sm:w-9/12 md:w-[70%]  xmd:w-[60%]"
      }`}
    >
      <div className="flex w-full items-center justify-between ">
        <div className="flex gap-3 py-2">
          <img
            src={generateAvatar("Name")}
            alt=""
            className="h-[3rem] w-[3rem] rounded-full"
          />

          <div className="flex flex-col">
            <span>First Second</span>
            <span className="text-primary/50">
              {getRandomImageColorIndex()} mins ago
            </span>
          </div>
        </div>

        <Dropdown
          inactive={<HiEllipsisHorizontal className="icon" />}
          active={<HiEllipsisHorizontal className="icon" />}
          dropdownComponent={<ManagePost post={post} />}
          displayState={showManageProfileDropdown}
          setDisplayState={setShowManageProfileDropdown}
        />
      </div>
      {/* image */}
      <div
        className={`h-[16rem] w-full  rounded-[2rem] ${
          colors[getRandomImageColorIndex()]
        }`}
      />
      {/* title */}
      <p className="px-3 py-1 text-sm  font-bold capitalize leading-loose text-primary">
        {post.title}
      </p>

      {/* body */}
      <p className="px-5 text-primary/60 first-letter:uppercase">
        {post?.body}
      </p>

      {/* actions */}
      <div className="mt-5 flex items-center justify-between py-2 px-3">
        <div className="flex gap-3 ">
          <div className="flex items-center gap-2">
            <Icon icon={<HiOutlineHeart className="icon" />} />
            <span>4k</span>
          </div>

          <div className="flex items-center gap-2">
            <Icon icon={<HiOutlineChatBubbleOvalLeft className="icon" />} />
            <span>2k</span>
          </div>
        </div>

        <Icon icon={<HiOutlineBookmark className="icon" />} />
      </div>
    </div>
  );
};

export default Post;
