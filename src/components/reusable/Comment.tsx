import { useAuth } from "@/hooks";
import { appUtils } from "@/utils";
import React from "react";

const Comment = ({ comment }: { comment: any }) => {
  /**
   * component states
   */
  const { generateAvatar } = appUtils;
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={`w-full rounded-[2.5rem] bg-white py-2 px-4 ${
        isAuthenticated ? "xmd:w-[75%]" : " sm:w-9/12 md:w-[70%]  xmd:w-[60%]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div>
          <img
            src={generateAvatar(comment?.email)}
            alt=""
            className={` h-16 w-16 rounded-full`}
          />
        </div>

        <span>{comment?.email}</span>
      </div>

      {/* comment info */}
      <div className="mt-2">
        <p className="text-primary/50 first-letter:uppercase">
          {comment?.name}
        </p>
        <p className="mt-2 ml-2 first-letter:uppercase">{comment?.body}</p>
      </div>
    </div>
  );
};

export default Comment;
