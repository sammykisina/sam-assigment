import { HiHome, HiOutlineHome } from "react-icons/hi2";
import { type Route } from "src/types/typings.t";

const routes: Route[] = [
  {
    name: "Home",
    inactiveIcon: <HiOutlineHome className="icon" />,
    activeIcon: <HiHome className="icon" />,
    to: "/",
  },
];

const routers = { routes };

export default routers;
