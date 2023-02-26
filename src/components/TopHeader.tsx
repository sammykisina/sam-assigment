import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import {
  CurrentNotifications,
  Dropdown,
  Icon,
  NavLink,
  Profile,
  Title,
} from "@/components";
import { HiBell, HiHome, HiOutlineBell, HiOutlineUser } from "react-icons/hi2";
import { useAuth } from "@/hooks";
import { useDispatch } from "react-redux";
import { setShowSidebarAction } from "../redux/reducer";
import { useRouter } from "next/router";

const TopHeader = () => {
  /**
   * component states
   */
  // const { showSidebarState } = appAtoms;
  // const setShowSidebar = useSetRecoilState(showSidebarState);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [showProfileDropdown, setShowProfileDropdown] =
    useState<boolean>(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] =
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
      case "/explore":
        title = "Explore";
        break;
      case "/reels":
        title = "Reels";
        break;

      case "/profile":
        title = "Profile";
        break;

      case "/shop":
        title = "Shop";
        break;
      case `/posts/${router?.query.id}`:
        title = "Single Post";
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
            <HiOutlineMenuAlt3 className="z-50 h-5 w-5 text-orange sm:hidden" />
          }
          purpose={() => dispatch(setShowSidebarAction({ showSidebar: true }))}
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
        {isAuthenticated && (
          <div className="flex">
            <Dropdown
              inactive={<HiOutlineUser className="icon" />}
              active={<HiOutlineUser className="icon" />}
              dropdownComponent={<Profile />}
              displayState={showProfileDropdown}
              setDisplayState={setShowProfileDropdown}
            />

            <Dropdown
              inactive={<HiOutlineBell className="icon" />}
              active={<HiBell className="icon" />}
              dropdownComponent={<CurrentNotifications />}
              displayState={showNotificationsDropdown}
              setDisplayState={setShowNotificationsDropdown}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopHeader;
