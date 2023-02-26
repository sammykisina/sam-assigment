import { useAuth } from "@/hooks";
import { appUtils } from "@/utils";
import React from "react";

const Profile = () => {
  /**
   * component states
   */
  const { generateAvatar } = appUtils;
  const { user } = useAuth();

  /**
   * component functions and reusable components
   */
  const ProfileInfo = ({ value, title }: { value: string; title: string }) => (
    <div className="flex flex-col items-center justify-center ">
      <span className="text-lg font-bold text-white">{value}</span>
      <span className="text-sm font-bold text-primary/50">{title}</span>
    </div>
  );

  return (
    <div className="flex h-[20rem] w-[20rem] flex-col bg-orange/50 px-4 py-5">
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <div className="rounded-full border-4 border-orange p-1 ">
          <img
            src={generateAvatar(user?.email)}
            className="h-[5rem] w-[5rem] rounded-full"
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="text-xl font-bold tracking-wider">{user?.name}</span>
          <span className="text-base">{`"${user.email}"`}</span>
        </div>
      </div>

      <div className="grid h-[8rem] w-full grid-cols-3 divide-x divide-orange  rounded-2xl border bg-orange/10">
        <ProfileInfo value="100" title="Posts" />
        <ProfileInfo value="1,5k" title="Followers" />
        <ProfileInfo value="500" title="Following" />
      </div>
    </div>
  );
};

export default Profile;
