import { Button, Logo, NavLink } from "@/components";
import { useAuth } from "@/hooks";
import { routers } from "@/routers";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  /**
   * component states
   */
  const { logout, isAuthenticated } = useAuth();
  const { routes } = routers;
  const pathname = usePathname();

  /**
   * component functions
   */

  return (
    <aside className="relative z-50  flex h-screen w-[250px] flex-col justify-between border-x-2 border-primary p-2 pt-8 duration-300">
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
