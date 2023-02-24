import { Button, Logo, NavLink } from "@/components";
import { useAuth, useClickOutside } from "@/hooks";
import { routers } from "@/routers";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { setShowSidebarAction } from "../redux/reducer";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  /**
   * component states
   */
  const { logout, isAuthenticated } = useAuth();
  const { routes } = routers;
  const pathname = usePathname();
  const sidebarComponentRef = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  /**
   * component functions
   */
  useClickOutside(sidebarComponentRef, () =>
    dispatch(setShowSidebarAction({ showSidebar: false }))
  );

  return (
    <aside
      ref={sidebarComponentRef}
      className="relative z-50  flex h-screen w-[250px] flex-col justify-between border-x-2 border-primary p-2 pt-8 duration-300"
    >
      <div className="mt-5">
        {/* the logo */}
        <div className="flex justify-center">
          <Logo logoStyles="text-[2.5rem]" dotStyles="w-2 h-2 bg-orange" />
        </div>

        {/* the links */}
        <ul className="flex flex-col gap-2  pt-6">
          {routes?.map((route, routeIndex) => (
            <NavLink
              key={routeIndex}
              route={route}
              type="medium"
              fullWidth={true}
              active={pathname === route.to && "navLinkActive"}
              moreActions={() =>
                dispatch(setShowSidebarAction({ showSidebar: false }))
              }
            />
          ))}
        </ul>
      </div>

      {/* the logout button */}
      {isAuthenticated && (
        <Button
          title="logout"
          intent="primary"
          form="large"
          type="button"
          purpose={logout}
        />
      )}
    </aside>
  );
};

export default Sidebar;
