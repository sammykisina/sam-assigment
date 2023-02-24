import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { Dropdown, Icon, NavLink, Profile, Title } from "@/components";
import { HiHome, HiOutlineUser } from "react-icons/hi2";
import { useAuth } from "@/hooks";
import { useDispatch } from "react-redux";
import { setShowSidebarAction } from "../redux/reducer";

const TopHeader = () => {
  /**
   * component states
   */
  // const { showSidebarState } = appAtoms;
  // const setShowSidebar = useSetRecoilState(showSidebarState);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [show_profile_dropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  /**
   * component function
   */
  const getTitle: (pathname: string) => string = (pathname) => {
    let title = "";

    switch (pathname) {
      case "/":
        title = "Home";
        break;
      case "/auth/login":
        title = "Login.";
        break;
      default:
        title = "Title";
    }

    return title;
  };

  return (
    <nav className="flex h-[50px] items-center justify-between rounded-md border border-primary/10 px-2">
      <div className="flex items-center gap-x-4">
        <Icon
          iconWrapperStyles={`${!isAuthenticated && "hidden"}`}
          icon={
            <HiOutlineMenuAlt3 className="text-c_green h-5 w-5 sm:hidden" />
          }
          purpose={() => dispatch(setShowSidebarAction())}
        />

        {/* the current page title */}
        {pathname &&
          (pathname === "/auth/login" ? (
            <NavLink
              route={{ to: "/", name: <HiHome className="icon" /> }}
              fullWidth={false}
              type="medium"
            />
          ) : (
            <Title
              title={getTitle(pathname)}
              titleStyles="capitalize text-c_dark text-xl font-semibold tracking-wider"
            />
          ))}
      </div>

      {/* the rest of the icons */}
      <div className="flex items-center  gap-x-2">
        {/* the current user dropdown */}
        {isAuthenticated ? (
          <div>
            <Dropdown
              inactive={<HiOutlineUser className="icon" />}
              dropdownComponent={<Profile />}
              displayState={show_profile_dropdown}
              setDisplayState={setShowProfileDropdown}
            />
          </div>
        ) : (
          <div className="px-2">
            <NavLink
              route={{ to: "/auth/login", name: "login" }}
              fullWidth={false}
              type="link"
              active={pathname === "/auth/login" && "activeLink"}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopHeader;
