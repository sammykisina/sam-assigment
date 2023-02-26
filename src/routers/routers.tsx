import {
  HiFire,
  HiHome,
  HiOutlineFire,
  HiOutlineHome,
  HiOutlinePlay,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiPlay,
  HiShoppingBag,
  HiUser,
} from "react-icons/hi2";
import { type Route } from "src/types/typings.t";

const routes: Route[] = [
  {
    name: "Home",
    inactiveIcon: <HiOutlineHome className="icon" />,
    activeIcon: <HiHome className="icon" />,
    to: "/",
  },
  {
    name: "Explore",
    inactiveIcon: <HiOutlineFire className="icon" />,
    activeIcon: <HiFire className="icon" />,
    to: "/explore",
  },
  {
    name: "Reels",
    inactiveIcon: <HiOutlinePlay className="icon" />,
    activeIcon: <HiPlay className="icon" />,
    to: "/reels",
  },
  {
    name: "Shop",
    inactiveIcon: <HiOutlineShoppingBag className="icon" />,
    activeIcon: <HiShoppingBag className="icon" />,
    to: "/shop",
  },
  {
    name: "Profile",
    inactiveIcon: <HiOutlineUser className="icon" />,
    activeIcon: <HiUser className="icon" />,
    to: "/profile",
  },
];

const routers = { routes };

export default routers;
