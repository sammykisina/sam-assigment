import { appUtils } from "@/utils";
import React from "react";

const Comment = ({ comment }: { comment: any }) => {
  /**
   * component states
   */
  const { generateAvatar } = appUtils;

  return (
    <div className="p-2">
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
