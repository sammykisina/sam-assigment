import { useAuth } from "@/hooks";
import { appUtils } from "@/utils";
import React from "react";

const Profile = () => {
  /**
   * component states
   */
  const { generateAvatar } = appUtils;
  const { user } = useAuth();

  return (
    <div className="flex h-[10rem] w-[20rem] items-center justify-center gap-4">
      <img src={generateAvatar(user?.email || "")} className="rounded-full" />

      <div className="flex flex-col gap-2">
        <span className="w-fit rounded-full bg-[#170140]/10 px-3 py-1 text-sm capitalize leading-loose text-[#170140] shadow-sm">
          {user?.name}
        </span>
        <span>{user?.email}</span>
      </div>
    </div>
  );
};

export default Profile;
