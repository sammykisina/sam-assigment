import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { FC } from "react";
import { type Route } from "src/types/typings.t";

const navlinkStyles = cva(
  "flex items-center rounded-full  gap-3 duration-300  focus:outline-none whitespace-nowrap ",
  {
    variants: {
      type: {
        small:
          "h-[38px] gap-[6px] text-[14px] bg-primary text-white px-4  py-2 flex justify-center",
        medium: "h-[40px] gap-[8px] px-[16px] text-[16px] py-2 ",
        large:
          "h-[56px] gap-[8px] px-[20px] text-[18px] hover:text-white hover:bg-c_dark  py-2",
        link: "h-[38px] gap-[6px] text-[14px] px-4 hover:bg-orange hover:text-white  py-2 text-gray-900 font-bold",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
      active: {
        true: "bg-primary w-full text-white ",
        navLinkActive: "bg-orange/50",
        activeLink: "text-white bg-orange px-2 py-2 flex justify-center ",
      },
    },
  }
);

interface NavLinkProps extends VariantProps<typeof navlinkStyles> {
  route: Route;
  moreActions?: () => void;
}

const NavLink: FC<NavLinkProps> = ({
  fullWidth,
  type,
  route,
  moreActions,
  active,
}) => {
  return (
    <Link
      href={route.to}
      onClick={() => {
        moreActions && moreActions();
      }}
    >
      <div className={navlinkStyles({ fullWidth, type, active })}>
        <div className={` ${active && "duration-300"}`}>
          {active ? route.activeIcon : route.inactiveIcon}
        </div>

        <span>{route.name}</span>
      </div>
    </Link>
  );
};

export default NavLink;
